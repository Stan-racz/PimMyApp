import { Controller, Post, Body, Inject } from '@nestjs/common';
import { UtilisateurService } from 'src/service/utilisateur.service';

@Controller("utilisateur")
export class UtilController {
  @Inject(UtilisateurService)
  private readonly serviceUtil: UtilisateurService;


  @Post("ajout")
  createPost(@Body() body: string) {
    // ajout a la BDD

    var i = 0;
    var len = body["utilisateurs"].length;
    var heureContrat;
    // fonctionne pour le formulaire et 1 user comme pour le CSV
    while (i < len) {

      //console.log(body["utilisateurs"][i]);
      heureContrat = parseInt(body["utilisateurs"][i]["nombreHeureContractuelle"]);
      this.serviceUtil.create(body["utilisateurs"][i]["nom"], body["utilisateurs"][i]["prenom"], body["utilisateurs"][i]["email"], body["utilisateurs"][i]["civilite"],
      heureContrat, body["utilisateurs"][i]["status"], body["utilisateurs"][i]["dateNaiss"]);
      i++;
    }
    console.log(body["utilisateurs"].length);
    console.log(body["utilisateurs"][0]);
    return `${JSON.stringify(body)}`;

  }
}