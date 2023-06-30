import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AccountsModel } from './modules/accounts/models/accounts.model';
import { AuthModule } from './modules/auth/auth.module';
import { RegisterCodesModel } from './modules/auth/models/register-codes.model';
import { CardsModule } from './modules/cards/cards.module';
import { LoyaltyCardsModel } from './modules/cards/models/loyalty-card.model';
import { OffersModel } from './modules/offers/models/offers.model';
import { OffersModule } from './modules/offers/offers.module';
import { OrganizationsModel } from './modules/organizations/models/organizations.model';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      sync: {
        force: false,
      },
      models: [
        AccountsModel,
        RegisterCodesModel,
        LoyaltyCardsModel,
        OrganizationsModel,
        OffersModel,
      ],
    }),
    AuthModule,
    CardsModule,
    AccountsModule,
    OffersModule,
    OrganizationsModule,
  ],
})
export class AppModule {}
