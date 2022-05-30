import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//gestion de l'instanciation des controllers (ajouter les controllers qu'on ajoute)
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
