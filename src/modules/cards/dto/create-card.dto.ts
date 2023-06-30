import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ example: '2022000400280001', description: 'Номер карты' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  readonly number: number;

  @ApiProperty({ example: '562894124CA2D1G3414', description: 'ID аккаунта' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  readonly accountId: string;
}
