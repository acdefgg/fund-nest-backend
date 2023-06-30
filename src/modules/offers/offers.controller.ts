import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { SuccessRespose } from 'src/responses/success.response';
import { Roles } from '../accounts/decarators/roles-auth.decorator';
import { RolesGuard } from '../accounts/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateOfferDto } from './dto/create-offer.dto';
import { EditOfferDto } from './dto/edit-offer.dto';
import { GetOfferDto } from './dto/get-offer.dto';
import { OffersModel } from './models/offers.model';
import { OffersService } from './offers.service';

@ApiTags('Модуль предложений')
@UsePipes(ValidationPipe)
@Roles('admin')
@UseGuards(AuthGuard, RolesGuard)
@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @ApiOperation({ summary: 'Создание предложения организации' })
  @ApiResponse({ type: OffersModel, status: 201 })
  @Post('create')
  async create(@Body() dto: CreateOfferDto) {
    return await this.offersService.create(dto);
  }

  @ApiOperation({ summary: 'Редактирование предложения' })
  @ApiResponse({ type: SuccessRespose, status: 200 })
  @Patch('edit')
  async edit(@Body() dto: EditOfferDto) {
    return await this.offersService.edit(dto);
  }

  @ApiOperation({ summary: 'Удаление предложения' })
  @ApiResponse({ type: SuccessRespose, status: 200 })
  @Delete('delete')
  async delete(@Body() dto: GetOfferDto) {
    return await this.offersService.delete(dto);
  }
}
