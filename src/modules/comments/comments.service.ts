import { Injectable } from '@nestjs/common';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './repositories/comment.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async findAllComments(): Promise<Comment[]> {
    const comments = await this.commentRepository.findAll();

    return comments;
  }

  async findComment(comment_id: string): Promise<Comment> {
    const comment = await this.commentRepository.findComment(comment_id);

    return comment;
  }

  async createComment(
    createCommentDTO: CreateCommentDTO,
    user_id: string,
  ): Promise<Comment> {
    const comment = await this.commentRepository.createComment(
      createCommentDTO,
      user_id,
    );

    return comment;
  }

  async updateComment(
    comment_id: string,
    updateCommentDTO: UpdateCommentDTO,
  ): Promise<Comment> {
    const comment = await this.commentRepository.updateComment(
      comment_id,
      updateCommentDTO,
    );

    return comment;
  }

  async softRemoveComment(comment_id: string) {
    await this.commentRepository.softRemoveComment(comment_id);
  }
}
