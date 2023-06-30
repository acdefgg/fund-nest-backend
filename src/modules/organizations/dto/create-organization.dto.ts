import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Магнит', description: 'Название организации' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 60, { message: 'Должно быть от 5 до 60 символов' })
  readonly title: string;

  @ApiProperty({
    example: 'Лучший магазин...',
    description: 'Описание организации',
  })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(10, 250, { message: 'Должно быть от 10 до 250 символов' })
  readonly description: string;

  @ApiProperty({ description: 'Адрес организации' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 120, { message: 'Должно быть от 5 до 120 символов' })
  readonly address: string;

  @ApiProperty({ description: 'Категория организации' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(2, 20, { message: 'Должно быть от 2 до 20 символов' })
  readonly category: string;
}
