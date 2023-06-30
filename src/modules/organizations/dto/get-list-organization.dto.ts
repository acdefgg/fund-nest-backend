import { ApiProperty } from '@nestjs/swagger';

export class GetListOrganizationDto {
  @ApiProperty({ example: 'Аптека', description: 'Категория организации' })
  readonly category: string;
}
