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

  async findComment(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findComment(id);

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
    id: string,
    updateCommentDTO: UpdateCommentDTO,
  ): Promise<Comment> {
    const comment = await this.commentRepository.updateComment(
      id,
      updateCommentDTO,
    );

    return comment;
  }

  async softRemoveComment(id: string) {
    await this.commentRepository.softRemoveComment(id);
  }
}
