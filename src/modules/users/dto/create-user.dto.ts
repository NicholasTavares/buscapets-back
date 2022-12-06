import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from 'src/utils/MatchDecorator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Nome deve ter no mínimo 4 caracteres.' })
  readonly name: string;

  @IsNotEmpty()
  @Matches(RegExHelper.email, {
    message: MessagesHelper.INVALID_PASSWORD_OR_EMAIL,
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres.' })
  @Matches(RegExHelper.password, { message: MessagesHelper.INVALID_PASSWORD })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres.' })
  @Match('password', { message: 'As senhas não são iguais.' })
  readonly passwordConfirm: string;

  @IsOptional()
  @IsObject()
  user_picture?: any;
}
