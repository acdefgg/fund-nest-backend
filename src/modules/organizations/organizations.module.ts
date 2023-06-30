import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrganizationsModel } from './models/organizations.model';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';

@Module({
  providers: [OrganizationsService],
  controllers: [OrganizationsController],
  imports: [
    SequelizeModule.forFeature([OrganizationsModel]),
    AuthModule,
    AccountsModule,
    FilesModule,
  ],
})
export class OrganizationsModule {}
