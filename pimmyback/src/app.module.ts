import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Utilisateur } from './entity/utilisateur.entity';
import { Demande_abs } from './entity/demandeabs.entity';
import { Absence } from './entity/absence.entity';
import { Abs_dispo } from './entity/absdispo.entity';
import { Services } from './entity/services.entity';
import { HeuresSemaine } from './entity/heuressemaine.entity';
import { UtilController } from './controller/utilisateur.controller';
import { UtilModule } from './module/utilisateur.module';
import { UtilisateurService } from './service/utilisateur.service';

//gestion de l'instanciation des controllers (ajouter les controllers qu'on ajoute)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'P1mpMy@pp5',
      database: 'PimpMyBDD',
      entities: [Utilisateur, Demande_abs, Absence, Abs_dispo, Services, HeuresSemaine],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UtilModule,
  ],
  controllers: [AppController, UtilController],
  providers: [AppService, UtilisateurService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}