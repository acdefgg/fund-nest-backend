import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetOrganizationDto {
  @ApiProperty({ example: '5ASDAS6-ASDASD61..', description: 'ID организации' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  readonly id: string;
}
