import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { PublicationRepository } from './repositories/publication.repository';
import { PublicationPicture } from './entities/publication_picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publication, PublicationPicture])],
  providers: [PublicationsService, PublicationRepository],
  controllers: [PublicationsController],
  exports: [PublicationsService],
})
export class PublicationsModule {}
