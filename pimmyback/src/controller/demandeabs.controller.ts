import { Controller, Get } from '@nestjs/common';
import { DemandeAbsService } from 'src/service/demandeabs.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller()
export class DemandeabsController {
  constructor(private readonly DemandeAbsService: DemandeAbsService) { }
}