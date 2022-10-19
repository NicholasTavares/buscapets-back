import { Injectable } from '@nestjs/common';
import S3StorageProvider from 'src/shared/providers/s3storage.provider';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { UpdatePublicationDTO } from './dto/update-publication.dto';
import { Publication } from './entities/publication.entity';
import { PublicationRepository } from './repositories/publication.repository';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationRepository: PublicationRepository) {}
  async findAllPublications(): Promise<Publication[]> {
    const publications = await this.publicationRepository.findAll();

    return publications;
  }

  async findPublication(id: string): Promise<Publication> {
    const publication = await this.publicationRepository.findPublication(id);

    return publication;
  }

  async createPublication(
    createPublicationDTO: CreatePublicationDTO,
    user_id: string,
  ): Promise<Publication> {
    const s3Provider = new S3StorageProvider();
    const filesname = await s3Provider.saveFiles(
      createPublicationDTO.publication_pictures,
    );
    createPublicationDTO.publication_pictures = filesname;

    const user = await this.publicationRepository.createPublication(
      createPublicationDTO,
      user_id,
    );

    return user;
  }

  async updatePublication(
    id: string,
    updatePublicationDTO: UpdatePublicationDTO,
  ): Promise<Publication> {
    const publication = await this.publicationRepository.updatePublication(
      id,
      updatePublicationDTO,
    );

    return publication;
  }

  async softRemovePublication(id: string) {
    await this.publicationRepository.softRemovePublication(id);
  }
}
