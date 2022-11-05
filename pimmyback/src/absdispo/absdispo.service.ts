import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Abs_dispo } from './absdispo.entity';
import { Repository } from 'typeorm';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class AbsDispoService {
  constructor(
    @InjectRepository(Abs_dispo)
    private absDispoServ: Repository<Abs_dispo>,
  ) { }

  findAll(): Promise<Abs_dispo[]> {
    return this.absDispoServ.find();
  }

  //   findOne(id: number): Promise<Abs_dispo> {
  //     return this.absDispoServ.findOne(id);
  //   }

  async remove(id: number): Promise<void> {
    await this.absDispoServ.delete(id);
  }
  //remplacer ça part une query ou qqch de moins fixe
  statusTab = ['Cadres', 'Non Cadres Administratif', 'Non Cadres Vie Scolaire'];

  ajoutCPP(absDispo: any) {
    const newDemande = new Abs_dispo();
    console.log(absDispo.status);
    if (absDispo.status == this.statusTab[0]) {
      newDemande.compteur = 36;
    } else if (absDispo.status == this.statusTab[1]) {
      newDemande.compteur = 36;
    } else if (absDispo.status == this.statusTab[2]) {
      newDemande.compteur = 51;
    }
    newDemande.id_util = absDispo.id_util;
    newDemande.id_abs = absDispo.id_abs;
    // return from(this.absDispoServ.save(newDemande)).pipe(
    //   map((absDispo: Abs_dispo) => {
    //     return absDispo;
    //   }),
    // )
  }
}