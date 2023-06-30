import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../accounts/accounts.service';
import { AccountsModel } from '../accounts/models/accounts.model';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterCodesModel } from './models/register-codes.model';
import { AccountRequest } from '../accounts/interfaces/account-request';
import { RegistrationDto } from './dto/registration.dto';
import { CardsService } from '../cards/cards.service';
import { GetAccountByNumberDto } from '../accounts/dto/get-account-by-number';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RegisterCodesModel)
    private registerCodesModel: typeof RegisterCodesModel,

    private jwtService: JwtService,
    private cardService: CardsService,
    private accountsService: AccountsService,
  ) {}

  /**
   * Генерация токена
   *
   * @param account
   * @returns
   */
  private async generateToken(account: AccountsModel) {
    const payload = {
      id: account.id,
      role: account.role,
      email: account.email,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * Авторизация в аккаунте
   *
   * @param dto
   * @returns
   */
  async login(dto: LoginDto) {
    const candidate = await this.accountsService.get({ email: dto.email });

    if (!candidate) {
      throw new BadRequestException(
        'Пользователь с указанной почтой не найден',
      );
    }

    if (!(await bcrypt.compare(dto.password, candidate.password))) {
      throw new UnauthorizedException({ message: 'Указан неверный пароль' });
    }

    return await this.generateToken(candidate);
  }

  /**
   * Авторизация в аккаунте по номеру карты
   *
   * @param dto
   * @returns
   */
  async loginByNumber(dto: GetAccountByNumberDto) {
    const account = await this.accountsService.getAccountByNumber(dto);
    return await this.generateToken(account);
  }

  /**
   * Генерация регистрационного кода
   *
   * @param req
   * @returns
   */
  async generateRegisterCode(req: AccountRequest) {
    const account = await this.accountsService.getAuthorized(req);

    let code = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789}{?>&^*%$#!@';
    for (let i = 0; i < 24; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    let registerCode;
    try {
      registerCode = await this.registerCodesModel.create({
        code,
        creatorAccountId: account.id,
      });
    } catch (e) {
      throw new InternalServerErrorException(
        `Регистрационный код не был записан в БД`,
      );
    }

    return registerCode;
  }

  /**
   * Регистрация аккаунта
   *
   * @param dto
   * @returns
   */
  async registration(dto: RegistrationDto) {
    const registerCode = await this.registerCodesModel.findOne({
      where: { code: dto.code },
    });

    if (!registerCode) {
      throw new BadRequestException('Введённый код недействителен');
    }

    const candidate = await this.accountsService.get({ email: dto.email });

    if (candidate) {
      throw new BadRequestException(
        'Пользователь с указанной почтой уже существует',
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, 5);
    const account = await this.accountsService.create({
      ...dto,
      password: passwordHash,
    });

    try {
      await registerCode.update({ accountId: account.id });
    } catch (e) {
      console.log(`Error record update register code: ${e}`);
    }

    return await this.generateToken(account);
  }
}
