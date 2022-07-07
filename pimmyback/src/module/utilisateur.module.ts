import { Controller, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilController } from 'src/controller/utilisateur.controller';
import { Utilisateur } from 'src/entity/utilisateur.entity';
import { UtilisateurService } from 'src/service/utilisateur.service';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur])],
  exports: [TypeOrmModule],
  controllers: [UtilController],
  providers: [UtilisateurService]
})
export class UtilModule {}