import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreatePublicationDTO } from '../dto/create-publication.dto';
import { UpdatePublicationDTO } from '../dto/update-publication.dto';
import { Publication } from '../entities/publication.entity';

@Injectable()
export class PublicationRepository extends Repository<Publication> {
  constructor(private dataSource: DataSource) {
    super(Publication, dataSource.createEntityManager());
  }

  async findAllPublications(): Promise<Publication[]> {
    const publications = this.createQueryBuilder('publications')
      .leftJoin(
        'publications.publication_pictures',
        'publication_bunch_pictures',
      )
      .select([
        'publications.id',
        'publications.title',
        'publications.description',
        'publications.address',
        'publications.type',
        'publications.sex',
        'publications.last_location',
        'publications.disappearance_date',
        'publications.created_at',
      ])
      .addSelect(['publication_bunch_pictures.publication_picture'])
      .orderBy('publications.created_at', 'DESC')
      .getMany();

    return publications;
  }

  async findPublication(publication_id: string): Promise<Publication> {
    const publication = await this.createQueryBuilder('publication')
      .leftJoin('publication.user', 'user')
      .leftJoin(
        'publication.publication_pictures',
        'publication_bunch_pictures',
      )
      .leftJoin('publication.comments', 'comments')
      .leftJoin('comments.user', 'comment_user')
      .where('publication.id = :id', { id: publication_id })
      .select([
        'publication.id',
        'publication.title',
        'publication.description',
        'publication.address',
        'publication.pet_name',
        'publication.type',
        'publication.sex',
        'publication.last_location',
        'publication.disappearance_date',
        'publication.created_at',
        'publication.updated_at',
      ])
      .addSelect([
        'user.id',
        'user.name',
        'publication_bunch_pictures.publication_picture',
        'comments.id',
        'comment_user.name',
        'comments.comment',
        'comments.created_at',
      ])
      .getOne();

    if (!publication) {
      throw new NotFoundException(`Publication ID ${publication_id} not found`);
    }

    return publication;
  }

  async createPublication(
    createPublicationDTO: CreatePublicationDTO,
    user_id: string,
  ): Promise<Publication> {
    const publication = this.create({
      ...createPublicationDTO,
      user_id,
    });

    await this.save(publication);

    return publication;
  }

  async updatePublication(
    user_id: string,
    publication_id: string,
    updatePublicationDTO: UpdatePublicationDTO,
  ): Promise<Publication> {
    const publication = await this.findOne({
      where: {
        id: publication_id,
        user_id,
      },
    });

    if (!publication) {
      throw new NotFoundException(`Publication ID ${publication_id} not found`);
    }

    return this.save({
      ...publication,
      ...updatePublicationDTO,
    });
  }

  async softRemovePublication(user_id: string, publication_id: string) {
    const publication = await this.findOne({
      where: {
        id: publication_id,
        user_id,
      },
      relations: ['comments', 'publication_pictures'],
    });

    if (!publication) {
      throw new NotFoundException(`Publication ID ${publication_id} not found`);
    }

    await this.softRemove(publication);
  }
}
