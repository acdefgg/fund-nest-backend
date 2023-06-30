import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class EditOfferDto {
  @ApiProperty({
    example: '562894124CA2D1G3414',
    description: 'ID предложения',
  })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  readonly id: string;

  @ApiProperty({
    example: '10% скидка на весь товар',
    description: 'Предложение',
  })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 60, { message: 'Должно быть от 5 до 60 символов' })
  readonly text: string;
}
