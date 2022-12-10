import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Absence } from 'src/absences/absence.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { Abs_dispo } from './absdispo.entity';
import { AbsDispoService } from './absdispo.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller('absDispo')
export class AbsDispoController {
  constructor(private readonly absDispoService: AbsDispoService) { }

  /**
   * Fonction qui ajoute dans la base de données pour un utilisateur un motif d'absence et les jours qu'il possède
   * @param absence 
   * @param user 
   */
  @Post()
  populateAbsDispo(@Body() absence: Absence, user: UserEntity) {
    this.absDispoService.ajoutConge(absence, user)
  }

}