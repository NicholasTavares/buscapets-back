import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty({ message: 'Escreva um comentário.' })
  @IsString()
  comment: string;

  @IsNotEmpty({ message: 'Comentário deve pertencer a uma publicação.' })
  @IsString()
  publication_id: string;
}
