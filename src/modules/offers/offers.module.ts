import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthModule } from '../auth/auth.module';
import { OffersModel } from './models/offers.model';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [
    SequelizeModule.forFeature([OffersModel]),
    AuthModule,
    AccountsModule,
  ],
})
export class OffersModule {}
