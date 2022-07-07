import { Controller, Post, Body, Inject } from '@nestjs/common';
import { UtilisateurService } from 'src/service/utilisateur.service';

@Controller("utilisateur")
export class UtilController {
  @Inject(UtilisateurService)
  private readonly serviceUtil : UtilisateurService;


  @Post("ajout")
  createPost(@Body() body: string) {
    // ajout a la BDD
    var heureContrat = parseInt(body["nbHeureContractuelle"]);
    this.serviceUtil.create(body["nom"],body["prenom"],body["email"],body["civilite"],body["status"],body["dateNaiss"],heureContrat);

    return `Ajout nouvel utilisateur manuel : ${JSON.stringify(body)}`;
  }
}