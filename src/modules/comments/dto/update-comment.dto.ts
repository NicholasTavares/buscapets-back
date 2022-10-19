import { OmitType } from '@nestjs/mapped-types';
import { CreateCommentDTO } from './create-comment.dto';

export class UpdateCommentDTO extends OmitType(CreateCommentDTO, [
  'publication_id',
] as const) {}
