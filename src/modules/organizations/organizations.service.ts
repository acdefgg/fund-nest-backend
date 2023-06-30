import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AccountRequest } from '../accounts/interfaces/account-request';
import { FilesService } from '../files/files.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { EditOrganizationDto } from './dto/edit-organization.dto';
import { GetOrganizationDto } from './dto/get-organization.dto';
import { OrganizationsModel } from './models/organizations.model';
import { GetListOrganizationDto } from './dto/get-list-organization.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(OrganizationsModel)
    private organizationsModel: typeof OrganizationsModel,
    private filesService: FilesService,
  ) {}

  /**
   * Создание организации
   * @param req
   * @param dto
   */
  async create(req: AccountRequest, dto: CreateOrganizationDto, icon: any) {
    const iconPath = this.filesService.create(icon);

    let organization;
    try {
      organization = await this.organizationsModel.create({
        ...dto,
        accountId: req.account.id,
        icon: iconPath,
      });
    } catch (e) {
      throw new InternalServerErrorException(`Ошибка записи организации в БД`);
    }

    return organization;
  }

  /**
   * Получение списка организаций
   */
  async getList(dto: GetListOrganizationDto) {
    const where = dto.category ? { category: dto.category } : {};
    return await this.organizationsModel.findAll({
      where,
    });
  }

  /**
   * Получение списка категорий
   */
  async getCategories() {
    return await this.organizationsModel.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category']],
    });
  }
  /**
   * Получение подробной информации об организации
   * @param dto
   * @returns
   */
  async getInfo(dto: GetOrganizationDto) {
    return await this.organizationsModel.findByPk(dto.id, {
      include: { all: true },
    });
  }

  /**
   * Редактирование информации об организации
   * @param dto
   */
  async edit(dto: EditOrganizationDto) {
    const organization = await this.organizationsModel.findByPk(dto.id);

    if (!organization) {
      throw new BadRequestException('Организации с указанным ID не существует');
    }

    try {
      await organization.update(dto);
    } catch (e) {
      throw new InternalServerErrorException(
        `Ошибка приминения изменений организации: ${e}`,
      );
    }

    return { ok: true };
  }

  /**
   * Удаление организации
   * @param dto
   */
  async delete(dto: GetOrganizationDto) {
    const organization = await this.organizationsModel.findByPk(dto.id);

    if (!organization) {
      throw new BadRequestException('Организации с указанным ID не существует');
    }

    try {
      await organization.destroy();
    } catch (e) {
      throw new InternalServerErrorException(
        `Ошибка удаления организации: ${e}`,
      );
    }

    return { ok: true };
  }
}
