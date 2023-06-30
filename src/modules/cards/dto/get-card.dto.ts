import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetCardDto {
  @ApiProperty({ example: '562894124CA2D1G3414', description: 'ID карты' })
  @IsOptional()
  readonly id?: string;

  @ApiProperty({ example: '2022000400280001', description: 'Номер карты' })
  @IsOptional()
  readonly number?: number;

  @ApiProperty({ example: '562894124CA2D1G3414', description: 'ID аккаунта' })
  @IsOptional()
  readonly accountId?: string;
}
