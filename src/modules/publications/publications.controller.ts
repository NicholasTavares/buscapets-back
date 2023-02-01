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
  constructor(private readonly publicationService: PublicationsService) { }

  @Get('/all')
  findAll() {
    return this.publicationService.findAllPublications();
  }

  @Get(':publication_id')
  findOne(@Param('publication_id') publication_id: string) {
    return this.publicationService.findPublication(publication_id);
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
    console.log(createPublicationDTO);
    return this.publicationService.createPublication(
      createPublicationDTO,
      req.user.id,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':publication_id')
  update(
    @Param('publication_id') publication_id: string,
    @Body() updatePublicationDTO: UpdatePublicationDTO,
    @Request() req: any,
  ) {
    return this.publicationService.updatePublication(
      req.user.id,
      publication_id,
      updatePublicationDTO,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':publication_id')
  remove(@Param('publication_id') publication_id: string) {
    return this.publicationService.softRemovePublication(publication_id);
  }
}
