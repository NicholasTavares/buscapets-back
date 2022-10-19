import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDTO } from './create-publication.dto';

export class UpdatePublicationDTO extends PartialType(CreatePublicationDTO) {}
