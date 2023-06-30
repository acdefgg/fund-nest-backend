import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardsService } from './cards.service';
import { LoyaltyCardsModel } from './models/loyalty-card.model';
import { CardsController } from './cards.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [CardsService],
  imports: [
    SequelizeModule.forFeature([LoyaltyCardsModel]),
    forwardRef(() => AccountsModule),
    forwardRef(() => AuthModule),
  ],
  exports: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
