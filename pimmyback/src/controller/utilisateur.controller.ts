import { Controller, Post, Body, Inject, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UtilisateurService } from 'src/service/utilisateur.service';

@Controller("utilisateur")
export class UtilController {
  @Inject(UtilisateurService)
  private readonly serviceUtil : UtilisateurService;

  // Ajout manuel
  @Post("ajout")
  createPost(@Body() body: string) {
    // ajout a la BDD
    var heureContrat = parseInt(body["nbHeureContractuelle"]);
    this.serviceUtil.create(body["nom"],body["prenom"],body["email"],body["civilite"],body["status"],body["dateNaiss"],heureContrat);

    return `Ajout nouvel utilisateur manuel : ${JSON.stringify(body)}`;
  }
  // Ajout d'un fichier (upload)
  @Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
}
}