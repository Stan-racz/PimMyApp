import { Injectable } from '@nestjs/common';


//Ici on définit les fonctions qui vont interagir avec la data (bdd api lecture et écriture)
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
