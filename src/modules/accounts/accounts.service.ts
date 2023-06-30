import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChangePasswordAccountDto } from './dto/change-password-account.dto copy';
import { CreateAccountDto } from './dto/create-account.dto';
import { EditAccountDto } from './dto/edit-account.dto';
import { GetAccountDto } from './dto/get-account.dto';
import { AccountRequest } from './interfaces/account-request';
import { AccountsModel } from './models/accounts.model';
import * as bcrypt from 'bcryptjs';
import { GetAccountByNumberDto } from './dto/get-account-by-number';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(AccountsModel)
    private accountsModel: typeof AccountsModel,
    private cardsService: CardsService,
  ) {}

  /**
   * Создание аккаунта
   * @param dto
   */
  async create(dto: CreateAccountDto) {
    try {
      return this.accountsModel.create(dto);
    } catch (e) {
      throw new InternalServerErrorException(`Аккаунт не был записан в БД`);
    }
  }

  /**
   * Получение аккаунта по ID и Email
   * @param dto
   */
  async get(dto: GetAccountDto) {
    try {
      return this.accountsModel.findOne({ where: <any>dto });
    } catch (e) {
      throw new NotFoundException(`Аккаунт не найден`);
    }
  }

  /**
   * Получение списка аккаунтов
   *
   * @returns
   */
  async getList() {
    try {
      return this.accountsModel.findAll({ include: { all: true } });
    } catch (e) {
      throw new InternalServerErrorException(
        `Ошибка получения списка аккаунтов`,
      );
    }
  }

  /**
   * Получить аккаунт с вложениями
   *
   * @param dto
   * @returns
   */
  async getAccountInclude(dto: GetAccountDto) {
    try {
      return this.accountsModel.findOne({
        where: <any>dto,
        include: { all: true },
      });
    } catch (e) {
      throw new NotFoundException(`Аккаунт не найден`);
    }
  }

  /**
   * Получение аккаунта по номеру карты
   *
   * @param dto
   * @returns
   */
  async getAccountByNumber(dto: GetAccountByNumberDto) {
    const card = await this.cardsService.get({ number: Number(dto.number) });

    if (!card) {
      throw new BadRequestException(`Карта с указанным номером не найдена`);
    }

    const account = await this.getAccountInclude({ id: card.accountId });

    if (!account) {
      throw new BadRequestException(
        `Аккаунт, привязанный к карте отсутствует в системе`,
      );
    }

    return account;
  }

  /**
   * Получение текущего авторизованного аккаунта
   * @param req
   */
  async getAuthorized(req: AccountRequest) {
    return this.accountsModel.findOne({
      where: { id: req.account.id },
      include: { all: true },
    });
  }

  /**
   * Получение информации об аккаунте по ID
   * @param id
   */
  async getInfoByID(id: number) {
    return this.accountsModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  /**
   * Редактирование информации об аккаунте
   * @param req
   * @param dto
   */
  async edit(req: AccountRequest, dto: EditAccountDto) {
    const account = await this.getAuthorized(req);

    try {
      await account.update(dto);
    } catch (e) {
      throw new InternalServerErrorException(
        `Ошибка приминения изменений аккаунта: ${e}`,
      );
    }

    return { ok: true };
  }

  /**
   * Смена пароля
   * @param req
   * @param dto
   */
  async changePassword(req: AccountRequest, dto: ChangePasswordAccountDto) {
    const account = await this.getAuthorized(req);

    if (!(await bcrypt.compare(dto.password, account.password))) {
      throw new BadRequestException(`Текущий пароль неверен`);
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 5);

    try {
      await account.update({ password: passwordHash });
    } catch (e) {
      throw new InternalServerErrorException(
        `Ошибка приминения изменений аккаунта: ${e}`,
      );
    }

    return { ok: true };
  }
}
