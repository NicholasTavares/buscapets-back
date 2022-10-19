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

  async findComment(id: string): Promise<Comment> {
    const comment = await this.findOne({
      where: {
        id,
      },
      relations: ['user', 'publication'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment ID ${id} not found`);
    }

    return comment;
  }

  async createComment(
    createCommentDTO: CreateCommentDTO,
    user_id: string,
  ): Promise<Comment> {
    const comment = this.create({
      ...createCommentDTO,
      user_id,
    });

    await this.save(comment);

    return comment;
  }

  async updateComment(
    id: string,
    updateCommentDTO: UpdateCommentDTO,
  ): Promise<Comment> {
    const comment = await this.preload({
      id,
      ...updateCommentDTO,
    });

    if (!comment) {
      throw new NotFoundException(`Comment ID ${id} not found`);
    }

    return this.save(comment);
  }

  async softRemoveComment(id: string) {
    await this.softRemove({ id });
  }
}
