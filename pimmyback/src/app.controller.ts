import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) { }

  //Get prend en paramètre la route
  @Get('world')
  getHello(): string {
    return this.appService.getHello();
  }
}
