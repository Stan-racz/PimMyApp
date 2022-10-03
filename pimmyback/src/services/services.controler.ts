import { Controller, Get } from '@nestjs/common';
import { ServicesService } from './services.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller()
export class ServicesController {
  constructor(private readonly servicesServices: ServicesService) { }
}