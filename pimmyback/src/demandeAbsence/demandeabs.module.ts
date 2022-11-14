import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceModule } from 'src/absences/absence.module';
import { AbsenceService } from 'src/absences/absence.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { DemandeAbsController } from './demandeabs.controller';
import { DemandeAbsEntity } from './demandeabs.entity';
import { DemandeAbsService } from './demandeabs.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemandeAbsEntity]),
    UserModule, AbsenceModule],
  controllers: [DemandeAbsController],
  providers: [DemandeAbsService],
  exports: [DemandeAbsService]
})
export class DemandeAbsModule { } 