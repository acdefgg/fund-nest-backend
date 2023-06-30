import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccountsModule } from '../accounts/accounts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegisterCodesModel } from './models/register-codes.model';
import { AuthGuard } from './guards/auth.guard';
import { AccountsService } from '../accounts/accounts.service';
import { CardsModule } from '../cards/cards.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([RegisterCodesModel]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRETKEY',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      },
    }),
    forwardRef(() => AccountsModule),
    forwardRef(() => CardsModule),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
