import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  AfterCreate,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { HookReturn } from 'sequelize/types/hooks';
import { RegisterCodesModel } from 'src/modules/auth/models/register-codes.model';
import { LoyaltyCardsModel } from 'src/modules/cards/models/loyalty-card.model';

interface AccountCreationInterface {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
}

@Table({ tableName: 'accounts' })
export class AccountsModel extends Model<
  AccountsModel,
  AccountCreationInterface
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

  @ApiProperty({ example: 'user', description: 'Роль пользователя в системе' })
  @Column({ type: DataType.STRING, defaultValue: 'user', allowNull: false })
  role: string;

  @ApiProperty({ example: 'ivanov@mail.ru', description: 'Электронная почта' })
  @Column({ type: DataType.STRING, /* unique: true, */ allowNull: false })
  email: string;

  @ApiProperty({
    example: '$12asdpio12;lasd1',
    description: 'Хэшированный пароль',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'Сергей', description: 'Имя' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: 'Безруков', description: 'Фамилия' })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({
    example: 'true',
    description: 'Индикатор подтверждения аккаунта',
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isConfirmed: string;

  @HasOne(() => RegisterCodesModel)
  registerCode: RegisterCodesModel;

  @HasOne(() => LoyaltyCardsModel)
  loyaltyCard: LoyaltyCardsModel;

  @AfterCreate
  static async createCard(account: AccountsModel) {
    const accountId = account.id;

    let numberString = '';
    const date = new Date(Date.now());
    numberString += date.getFullYear();
    numberString += ('0000' + date.getMonth()).slice(-4);
    numberString += ('0000' + date.getDay()).slice(-4);
    numberString += accountId
      .replace(new RegExp(/[a-zA-Z-]+/, 'g'), '')
      .slice(-4);

    const number = Number(numberString);

    try {
      await LoyaltyCardsModel.create({ number, accountId });
    } catch (e) {
      throw new InternalServerErrorException(`Ошибка записи карты в БД: ${e}`);
    }
  }
}
