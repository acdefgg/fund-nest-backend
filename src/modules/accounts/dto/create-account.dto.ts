import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ example: 'Сергей', description: 'Имя' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должен быть строкой' })
  @Length(2, 40, { message: 'Должен быть от 2 до 40 символов' })
  readonly firstName: string;

  @ApiProperty({ example: 'Безруков', description: 'Фамилия' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должен быть строкой' })
  @Length(2, 40, { message: 'Должен быть от 2 до 40 символов' })
  readonly lastName: string;

  @ApiProperty({ example: 'ivanov@mail.ru', description: 'Электронная почта' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный адрес эл. почты' })
  readonly email: string;

  @ApiProperty({ example: '123123', description: 'Пароль' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должен быть строкой' })
  @Length(6, 32, { message: 'Должен быть от 6 до 32 символов' })
  readonly password: string;
}
