import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClientAccountDto {
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
}
