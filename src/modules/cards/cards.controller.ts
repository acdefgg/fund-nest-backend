import { Body, Controller, Patch, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { SuccessRespose } from 'src/responses/success.response';
import { Roles } from '../accounts/decarators/roles-auth.decorator';
import { RolesGuard } from '../accounts/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CardsService } from './cards.service';
import { GetCardDto } from './dto/get-card.dto';

@ApiTags('Модуль карт лояльности')
@UsePipes(ValidationPipe)
@Roles('admin')
@UseGuards(AuthGuard, RolesGuard)
@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @ApiOperation({ summary: 'Блокировка карты лояльности' })
  @ApiResponse({ type: SuccessRespose, status: 201 })
  @Patch('block')
  async block(@Body() dto: GetCardDto) {
    return await this.cardsService.block(dto);
  }
}
