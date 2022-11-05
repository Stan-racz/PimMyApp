import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/models/user.entity';
import { DemandeAbsEntity } from './demandeAbsence/demandeabs.entity';
import { Absence } from './absences/absence.entity';
import { Abs_dispo } from './absdispo/absdispo.entity';
import { Services } from './services/services.entity';
import { HeuresSemaine } from './heuresSemaine/heuressemaine.entity';
import { ServicesModule } from './services/services.module';
import { ServicesController } from './services/services.controler';
import { ServicesService } from './services/services.service';
import { DemandeAbsModule } from './demandeAbsence/demandeAbs.module';
import { AbsenceModule } from './absences/absence.module';
import { AbsDispoModule } from './absdispo/absdispo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      url: "",
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'P1mpMy@pp5',
      database: 'PimpMyBDD',
      entities: [UserEntity, DemandeAbsEntity, Absence, Abs_dispo, Services, HeuresSemaine],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    ServicesModule,
    DemandeAbsModule,
    AbsenceModule,
    AbsDispoModule],
  controllers: [AppController, ServicesController],
  providers: [AppService, ServicesService]
})
export class AppModule { }
