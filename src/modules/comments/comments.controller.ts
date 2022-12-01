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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.commentsService.findAllComments();
  }

  @Get(':comment_id')
  findOne(@Param('comment_id') comment_id: string) {
    return this.commentsService.findComment(comment_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCommentDTO: CreateCommentDTO, @Request() req: any) {
    return this.commentsService.createComment(createCommentDTO, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':comment_id')
  update(
    @Param('comment_id') comment_id: string,
    @Body() updateCommentDTO: UpdateCommentDTO,
  ) {
    return this.commentsService.updateComment(comment_id, updateCommentDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':comment_id')
  remove(@Param('comment_id') comment_id: string) {
    return this.commentsService.softRemoveComment(comment_id);
  }
}
