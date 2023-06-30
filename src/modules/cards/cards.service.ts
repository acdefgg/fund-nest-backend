import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCardDto } from './dto/create-card.dto';
import { GetCardDto } from './dto/get-card.dto';
import { LoyaltyCardsModel } from './models/loyalty-card.model';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(LoyaltyCardsModel)
    private loyaltyCardsModel: typeof LoyaltyCardsModel,
  ) {}

  /**
   * Создание карты лояльности
   * @param dto
   */
  async create(dto: CreateCardDto) {
    try {
      await this.loyaltyCardsModel.create(dto);
    } catch (e) {
      throw new InternalServerErrorException(`Ошибка записи карты в БД: ${e}`);
    }
  }

  /**
   * Получение карты лояльности по аттрибутам:
   * - ID карты;
   * - номер карты;
   * - ID аккаунта.
   *
   * @param dto
   * @returns
   */
  async get(dto: GetCardDto) {
    const loyaltyCard = await this.loyaltyCardsModel.findOne({
      where: <any>dto,
    });

    if (!loyaltyCard) {
      throw new BadRequestException(
        `Карта лояльности с указанными параметрами не найдена`,
      );
    }

    return loyaltyCard;
  }

  /**
   * Блокировка карты лояльности по ID аккаунта
   * @param dto
   */
  async block(dto: GetCardDto) {
    const loyaltyCard = await this.loyaltyCardsModel.findOne({
      where: <any>dto,
    });

    if (!loyaltyCard) {
      throw new BadRequestException(
        `Карта лояльности с указанными параметрами не найдена`,
      );
    }

    if (loyaltyCard.isBlocked) {
      throw new BadRequestException(`Карта лояльности уже заблокирована`);
    }

    try {
      await loyaltyCard.update({ isBlocked: true });
    } catch (e) {
      throw new InternalServerErrorException(
        `Ошибка блокировки карты лояльности: ${e}`,
      );
    }

    return { ok: true };
  }
}
