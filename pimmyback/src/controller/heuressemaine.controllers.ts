import { Controller, Get } from '@nestjs/common';
import { HeuresSemaineService } from 'src/service/heuresSemaines.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller()
export class HeuresSemaineController {
  constructor(private readonly heuresSemaineServices: HeuresSemaineService) { }
}