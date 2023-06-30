import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class GetAccountByNumberDto {
  @ApiProperty({ description: 'Уникальный номер карты' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  readonly number: number | string;
}
