import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { SuccessRespose } from 'src/responses/success.response';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AccountsService } from './accounts.service';
import { Roles } from './decarators/roles-auth.decorator';
import { ChangePasswordAccountDto } from './dto/change-password-account.dto copy';
import { CreateClientAccountDto } from './dto/create-client-account.dto';
import { EditAccountDto } from './dto/edit-account.dto';
import { GetAccountByNumberDto } from './dto/get-account-by-number';
import { RolesGuard } from './guards/roles.guard';
import { AccountRequest } from './interfaces/account-request';
import { AccountsModel } from './models/accounts.model';

@ApiTags('Модуль аккаунтов')
@UseGuards(AuthGuard, RolesGuard)
@UsePipes(ValidationPipe)
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @ApiOperation({ summary: 'Создание аккаунта для клиента' })
  @ApiResponse({ type: AccountsModel, status: 201 })
  @Roles('admin')
  @Post('createClient')
  async createClient(@Body() dto: CreateClientAccountDto) {
    const account = await this.accountsService.create({
      ...dto,
      email: 'user@fund.ru',
      password: Math.random().toString(36),
    });
    const { id, firstName, lastName, loyaltyCard } =
      await this.accountsService.getAccountInclude({ id: account.id });
    return { id, firstName, lastName, uniqueNumber: loyaltyCard.number };
  }

  @ApiOperation({ summary: 'Создание аккаунта для клиента' })
  @ApiResponse({ type: AccountsModel, status: 201 })
  @Get('verify')
  async verify(@Query() dto: GetAccountByNumberDto) {
    return await this.accountsService.getAccountByNumber(dto);
  }

  @ApiOperation({
    summary: 'Получение информации о текущем авторизованном аккаунте',
  })
  @ApiResponse({ type: AccountsModel, status: 200 })
  @Get('getInfo')
  async getInfo(@Req() req: AccountRequest) {
    return await this.accountsService.getAuthorized(req);
  }

  @ApiOperation({
    summary: 'Получение информации об аккаунте по id',
  })
  @ApiResponse({ type: AccountsModel, status: 200 })
  @Get('getInfoByID')
  async getInfoByID(@Query('id') id: number) {
    return await this.accountsService.getInfoByID(id);
  }

  @ApiOperation({ summary: 'Редактирование информации об аккаунте' })
  @ApiResponse({ type: SuccessRespose, status: 201 })
  @Patch('edit')
  async edit(@Req() req: AccountRequest, @Body() dto: EditAccountDto) {
    return await this.accountsService.edit(req, dto);
  }

  @ApiOperation({ summary: 'Смена текущего пароля на новый' })
  @ApiResponse({ type: SuccessRespose, status: 201 })
  @Patch('changePassword')
  async changePassword(
    @Req() req: AccountRequest,
    @Body() dto: ChangePasswordAccountDto,
  ) {
    return await this.accountsService.changePassword(req, dto);
  }

  @Roles('admin')
  @Get('getList')
  async getList() {
    return await this.accountsService.getList();
  }
}
