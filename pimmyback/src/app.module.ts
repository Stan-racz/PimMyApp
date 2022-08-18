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
import { AuthModule } from './module/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './module/user.module';
import { AuthService } from './service/auth.service';
import { UserController } from './controller/user.controller';

//gestion de l'instanciation des controllers (ajouter les controllers qu'on ajoute)
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        signOptions: { expiresIn: '15m' }
      })
    }),
    UtilModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController, UtilController, UserController],
  providers: [AppService, UtilisateurService, AuthService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}