import { Controller, Get, Post, Body } from '@nestjs/common';
import { UtilisateurService } from '../service/utilisateur.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller()
export class UtilController {
  constructor(private readonly utilService: UtilisateurService) { }
  @Post()
  createPost(@Body() body: string) {
    return `Created a new post with values of ${JSON.stringify(body)} 🚀`;
  }
}