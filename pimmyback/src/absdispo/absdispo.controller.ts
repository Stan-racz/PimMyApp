import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Abs_dispo } from './absdispo.entity';
import { AbsDispoService } from './absdispo.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller('absDispo')
export class AbsDispoController {
  constructor(private readonly absDispoService: AbsDispoService) { }


  @Post()
  populateAbsDispo(@Body() absDispo: any) {
    //ne pas oublier d'ajouter une fonction qui décompte les jours de congés dispo de l'utilisateur /!\
    // console.log(demandeAbs);
    // return this.absDispoService.ajoutCPP(absDispo).pipe()
    this.absDispoService.ajoutCPP(absDispo)
  }
}