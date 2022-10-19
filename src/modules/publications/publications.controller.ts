import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { UpdatePublicationDTO } from './dto/update-publication.dto';
import { PublicationsService } from './publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationService: PublicationsService) {}
  @Get()
  findAll() {
    return this.publicationService.findAllPublications();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationService.findPublication(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FilesInterceptor('publication_pictures', 5, {
      limits: {
        fileSize: 10485760, //10mb
      },
    }),
  )
  create(
    @Body() createPublicationDTO: CreatePublicationDTO,
    @UploadedFiles() publication_pictures: Express.Multer.File[],
    @Request() req: any,
  ) {
    createPublicationDTO.publication_pictures = publication_pictures;
    return this.publicationService.createPublication(
      createPublicationDTO,
      req.user.id,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicationDTO: UpdatePublicationDTO,
  ) {
    return this.publicationService.updatePublication(id, updatePublicationDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.softRemovePublication(id);
  }
}
