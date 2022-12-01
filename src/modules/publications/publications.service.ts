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
    const publications = await this.publicationRepository.findAllPublications();

    return publications;
  }

  async findPublication(publication_id: string): Promise<Publication> {
    const publication = await this.publicationRepository.findPublication(
      publication_id,
    );

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
    publication_id: string,
    updatePublicationDTO: UpdatePublicationDTO,
  ): Promise<Publication> {
    const publication = await this.publicationRepository.updatePublication(
      publication_id,
      updatePublicationDTO,
    );

    return publication;
  }

  async softRemovePublication(publication_id: string) {
    await this.publicationRepository.softRemovePublication(publication_id);
  }
}
