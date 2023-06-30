import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { OffersModel } from 'src/modules/offers/models/offers.model';

interface OrganizationCreationInterface {
  title: string;
  description: string;
  icon: string;
  address: string;
  category: string;
  accountId: string;
}

@Table({ tableName: 'organizations' })
export class OrganizationsModel extends Model<
  OrganizationsModel,
  OrganizationCreationInterface
> {
  @ApiProperty({ example: '562894124CA2D1G3414', description: 'UUID' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: 'Магнит', description: 'Название организации' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'Лучший магазин...',
    description: 'Описание организации',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({
    example: 'Аптека',
    description: 'Категория организации',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  category: string;

  @ApiProperty({
    example: '/uploads/12e12e12ione2i1.jpg',
    description: 'Фотография организации',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  icon: string;

  @ApiProperty({ description: 'Адрес организации' })
  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @HasMany(() => OffersModel)
  offers: OffersModel[];
}
