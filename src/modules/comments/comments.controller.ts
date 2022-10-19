import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  findAll() {
    return this.commentsService.findAllComments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findComment(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCommentDTO: CreateCommentDTO, @Request() req: any) {
    return this.commentsService.createComment(createCommentDTO, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDTO: UpdateCommentDTO) {
    return this.commentsService.updateComment(id, updateCommentDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.softRemoveComment(id);
  }
}
