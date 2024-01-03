import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly passwordConfirm: string;
}
