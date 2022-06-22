import { Controller, Module } from '@nestjs/common';
import { UtilisateurService } from 'src/service/utilisateur.service';
import { UtilController } from 'src/controller/utilisateur.controller';
import { UtilModule } from './utilisateur.module';
;

@Module({
  imports: [UtilModule],
  providers: [UtilisateurService],
  controllers: [UtilController] 
})
export class UtilHttpModule {}