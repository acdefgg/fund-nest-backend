import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrganizationsModel } from 'src/modules/organizations/models/organizations.model';

interface OfferCreationInterface {
  title: string;
  description: string;
  icon: string;
  accountId: string;
}

@Table({ tableName: 'offers' })
export class OffersModel extends Model<OffersModel, OfferCreationInterface> {
  @ApiProperty({ example: '1', description: 'ID' })
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '10% скидка на весь товар',
    description: 'Предложение',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({
    example: '562894124CA2D1G3414',
    description: 'ID организации',
  })
  @ForeignKey(() => OrganizationsModel)
  organizationId: string;
  @BelongsTo(() => OrganizationsModel)
  organization: OrganizationsModel;
}
