import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { UpdateCommentDTO } from '../dto/update-comment.dto';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.find();

    return comments;
  }

  async findComment(comment_id: string): Promise<Comment> {
    const comment = await this.findOne({
      where: {
        id: comment_id,
      },
      relations: ['user', 'publication'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment ID ${comment_id} not found`);
    }

    return comment;
  }

  async createComment(
    createCommentDTO: CreateCommentDTO,
    user_id: string,
  ): Promise<Comment> {
    const comment = this.create({
      user_id,
      ...createCommentDTO,
    });

    return this.save(comment);
  }

  async updateComment(
    user_id: string,
    comment_id: string,
    updateCommentDTO: UpdateCommentDTO,
  ): Promise<Comment> {
    const comment = await this.findOne({
      where: {
        id: comment_id,
        user_id,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment ID ${comment_id} not found`);
    }

    return this.save({
      ...comment,
      ...updateCommentDTO,
    });
  }

  async softRemoveComment(user_id: string, comment_id: string) {
    const comment = await this.findOne({
      where: {
        id: comment_id,
        user_id,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment ID ${comment_id} not found`);
    }

    await this.softRemove(comment);
  }
}
