import { Controller, Post, Body, Inject } from '@nestjs/common';
import { UtilisateurService } from 'src/service/utilisateur.service';

@Controller("utilisateur")
export class UtilController {
  @Inject(UtilisateurService)
  private readonly serviceUtil: UtilisateurService;


  @Post("ajout")
  createPost(@Body() body: string) {
    // ajout a la BDD

    var heureContrat = parseInt(body["nombreHeureContractuelle"]);
    this.serviceUtil.create(body["nom"], body["prenom"], body["email"], body["civilite"], heureContrat, body["status"], body["dateNaiss"]);

    console.log(body);
    return `${JSON.stringify(body)}`;
  }
  @Post("csv")
  userFromCsv(@Body() body: string) { }
}