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

  async findAll(): Promise<Publication[]> {
    const publications = await this.find({
      relations: ['publication_pictures'],
    });

    return publications;
  }

  async findPublication(id: string): Promise<Publication> {
    const publication = await this.findOne({
      where: {
        id,
      },
      relations: ['user', 'comments'],
    });

    if (!publication) {
      throw new NotFoundException(`Publication ID ${id} not found`);
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
    id: string,
    updatePublicationDTO: UpdatePublicationDTO,
  ): Promise<Publication> {
    const publication = await this.preload({
      id,
      ...updatePublicationDTO,
    });

    if (!publication) {
      throw new NotFoundException(`Publication ID ${id} not found`);
    }

    return this.save(publication);
  }

  async softRemovePublication(id: string) {
    await this.softRemove({ id });
  }
}
