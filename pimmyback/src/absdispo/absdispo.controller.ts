import { Controller, Get } from '@nestjs/common';
import { AbsDispoService } from './absdispo.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller()
export class AbsDispoController {
  constructor(private readonly absDispoService: AbsDispoService) { }
}