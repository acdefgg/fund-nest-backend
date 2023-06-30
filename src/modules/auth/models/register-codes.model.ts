import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AccountsModel } from 'src/modules/accounts/models/accounts.model';

interface RegisterCodeCreationInterface {
  code: string;
  creatorAccountId: string;
}

@Table({ tableName: 'register-codes' })
export class RegisterCodesModel extends Model<
  RegisterCodesModel,
  RegisterCodeCreationInterface
> {
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
    example: '91h2eo12be129v9r122e1oi2e',
    description: 'Код регистрации',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  code: string;

  @ApiProperty({
    example: '562894124CA2D1G3414',
    description: 'ID аккаунта создателя',
  })
  @ForeignKey(() => AccountsModel)
  creatorAccountId: string;
  @BelongsTo(() => AccountsModel)
  creatorAccount: AccountsModel;

  @ApiProperty({
    example: '562894124CA2D1G3414',
    description: 'ID зарегистрированного аккаунта',
  })
  @ForeignKey(() => AccountsModel)
  accountId: string;
  @BelongsTo(() => AccountsModel)
  account: AccountsModel;
}
