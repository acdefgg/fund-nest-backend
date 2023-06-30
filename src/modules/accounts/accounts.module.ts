import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CardsModule } from '../cards/cards.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsModel } from './models/accounts.model';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [
    SequelizeModule.forFeature([AccountsModel]),
    forwardRef(() => AuthModule),
    forwardRef(() => CardsModule),
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
