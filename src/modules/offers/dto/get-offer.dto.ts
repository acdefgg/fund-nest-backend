import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetOfferDto {
  @ApiProperty({
    example: '562894124CA2D1G3414',
    description: 'ID предложения',
  })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  readonly id: string;
}
