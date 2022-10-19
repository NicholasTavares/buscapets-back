import { Transform } from 'class-transformer';
import { IsEnum, IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { Geometry } from 'geojson';
import { ToGeometry } from '../../../utils/ToGeometry';

export enum TypePublication {
  MISSING = 'missing',
  ADOPTION = 'adoption',
}

export enum TypeSex {
  MALE = 'male',
  FEMALE = 'female',
}

export class CreatePublicationDTO {
  @IsNotEmpty({ message: 'Título da publicação é obrigatório.' })
  @IsString()
  readonly title: string;

  @IsNotEmpty({ message: 'Descrição da publicação é obrigatório.' })
  @IsString()
  readonly description: string;

  @IsNotEmpty({ message: 'Nome do pet é obrigatório.' })
  @IsString()
  readonly pet_name: string;

  @IsNotEmpty({ message: 'Tipo da publicação é obrigatório.' })
  @IsString()
  @IsEnum(TypePublication, { message: 'Valor inválido' })
  readonly type: TypePublication;

  @IsNotEmpty({ message: 'Sexo do pet é obrigatório.' })
  @IsString()
  @IsEnum(TypeSex, { message: 'Valor inválido' })
  readonly sex: TypeSex;

  @IsNotEmpty({ message: 'Última localização do pet é obrigatória.' })
  @Transform(({ value }) => (value ? ToGeometry(value) : undefined))
  readonly last_location: Geometry;

  @IsNotEmpty({ message: 'Data do desaparecimento do pet é obrigatória.' })
  @IsISO8601(true, { message: 'Data inválida' })
  readonly disappearance_date: Date;

  publication_pictures?: any;
}
