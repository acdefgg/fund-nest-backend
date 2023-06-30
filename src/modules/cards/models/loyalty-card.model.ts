import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { AccountsModel } from 'src/modules/accounts/models/accounts.model';

interface LoyaltyCardCreationInterface {
  number: number;
  accountId: string;
}

@Table({ tableName: 'loyalty-cards' })
export class LoyaltyCardsModel extends Model<
  LoyaltyCardsModel,
  LoyaltyCardCreationInterface
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

  @ApiProperty({ example: '2022000400280001', description: 'Номер карты' })
  @Column({ type: DataType.BIGINT, allowNull: false })
  number: number;

  @ApiProperty({
    example: 'false',
    description: 'Индикатор блокировки карты лояльности',
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBlocked: boolean;

  @ApiProperty({ example: '562894124CA2D1G3414', description: 'ID аккаунта' })
  @ForeignKey(() => AccountsModel)
  accountId: string;
  @BelongsTo(() => AccountsModel)
  account: AccountsModel;
}
