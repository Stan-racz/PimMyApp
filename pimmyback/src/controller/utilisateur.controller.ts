import { Controller, Get } from '@nestjs/common';
import { UtilisateurService } from '../service/utilisateur.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller()
export class UtilController {
  constructor(private readonly utilService: UtilisateurService) { }
}