import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { SuccessRespose } from 'src/responses/success.response';
import { Roles } from '../accounts/decarators/roles-auth.decorator';
import { RolesGuard } from '../accounts/guards/roles.guard';
import { AccountRequest } from '../accounts/interfaces/account-request';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { EditOrganizationDto } from './dto/edit-organization.dto';
import { GetOrganizationDto } from './dto/get-organization.dto';
import { OrganizationsModel } from './models/organizations.model';
import { OrganizationsService } from './organizations.service';
import { GetListOrganizationDto } from './dto/get-list-organization.dto';

@ApiTags('Модуль организаций')
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard, RolesGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @ApiOperation({ summary: 'Создание организации' })
  @ApiResponse({ type: OrganizationsModel, status: 201 })
  @UseInterceptors(FileInterceptor(`icon`))
  @Roles('admin')
  @Post('create')
  async create(
    @Req() req: AccountRequest,
    @Body() dto: CreateOrganizationDto,
    @UploadedFile() icon,
  ) {
    return await this.organizationsService.create(req, dto, icon);
  }

  @ApiOperation({ summary: 'Получение списка организаций' })
  @ApiResponse({ type: [OrganizationsModel], status: 201 })
  @Get('getList')
  async getList(@Query() dto: GetListOrganizationDto) {
    return await this.organizationsService.getList(dto);
  }

  @ApiOperation({ summary: 'Получение списка категорий' })
  @ApiResponse({ type: [OrganizationsModel], status: 201 })
  @Get('getCategories')
  async getCategories() {
    return await this.organizationsService.getCategories();
  }

  @ApiOperation({ summary: 'Получение подробной информации об организации' })
  @ApiResponse({ type: OrganizationsModel, status: 201 })
  @Get('getInfo')
  async getInfo(@Query() dto: GetOrganizationDto) {
    return await this.organizationsService.getInfo(dto);
  }

  @ApiOperation({ summary: 'Редактирование информации об организации' })
  @ApiResponse({ type: SuccessRespose, status: 201 })
  @Roles('admin')
  @Patch('edit')
  async edit(@Body() dto: EditOrganizationDto) {
    return await this.organizationsService.edit(dto);
  }

  @ApiOperation({ summary: 'Удаление организации' })
  @ApiResponse({ type: SuccessRespose, status: 201 })
  @Roles('admin')
  @Delete('delete')
  async delete(@Body() dto: GetOrganizationDto) {
    return await this.organizationsService.delete(dto);
  }
}
