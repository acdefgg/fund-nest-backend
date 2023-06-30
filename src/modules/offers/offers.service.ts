import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOfferDto } from './dto/create-offer.dto';
import { EditOfferDto } from './dto/edit-offer.dto';
import { GetOfferDto } from './dto/get-offer.dto';
import { OffersModel } from './models/offers.model';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(OffersModel)
    private offersModel: typeof OffersModel,
  ) {}

  /**
   * Создание предложения для организации
   * @param dto
   */
  async create(dto: CreateOfferDto) {
    let offer;
    try {
      offer = await this.offersModel.create(dto);
    } catch (e) {
      throw new InternalServerErrorException(
        'Не удалось записать предложение в БД',
      );
    }

    return offer;
  }

  /**
   * Редактирование предложения
   * @param dto
   */
  async edit(dto: EditOfferDto) {
    const offer = await this.offersModel.findByPk(dto.id);

    if (!offer) {
      throw new BadRequestException('Предложения с указанным ID не существует');
    }

    try {
      await offer.update(<any>dto);
    } catch (e) {
      throw new InternalServerErrorException(
        `Ошибка приминения изменений предложения: ${e}`,
      );
    }

    return { ok: true };
  }

  /**
   * Редактирование предложения
   * @param dto
   */
  async delete(dto: GetOfferDto) {
    const offer = await this.offersModel.findByPk(dto.id);

    if (!offer) {
      throw new BadRequestException('Предложения с указанным ID не существует');
    }

    try {
      await offer.destroy();
    } catch (e) {
      throw new InternalServerErrorException(
        `Ошибка удаления предложения: ${e}`,
      );
    }

    return { ok: true };
  }
}
