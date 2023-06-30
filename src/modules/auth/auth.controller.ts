import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Roles } from '../accounts/decarators/roles-auth.decorator';
import { GetAccountByNumberDto } from '../accounts/dto/get-account-by-number';
import { RolesGuard } from '../accounts/guards/roles.guard';
import { AccountRequest } from '../accounts/interfaces/account-request';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { AuthGuard } from './guards/auth.guard';
import { RegisterCodesModel } from './models/register-codes.model';
import { TokenResponse } from './responses/token.response';

@ApiTags('Модуль авторизации')
@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация в аккаунте' })
  @ApiResponse({ type: TokenResponse, status: 201 })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Авторизация в аккаунте по номеру карты' })
  @ApiResponse({ type: TokenResponse, status: 201 })
  @Post('loginByNumber')
  async loginByNumber(@Body() dto: GetAccountByNumberDto) {
    return await this.authService.loginByNumber(dto);
  }

  @ApiOperation({ summary: 'Генерация токена доступа' })
  @ApiResponse({ type: RegisterCodesModel, status: 201 })
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Post('generateRegisterCode')
  async generateRegisterCode(@Req() req: AccountRequest) {
    return await this.authService.generateRegisterCode(req);
  }

  @ApiOperation({ summary: 'Регистрация аккаунта' })
  @ApiResponse({ type: TokenResponse, status: 201 })
  @Post('registration')
  async registration(@Body() dto: RegistrationDto) {
    return await this.authService.registration(dto);
  }
}
