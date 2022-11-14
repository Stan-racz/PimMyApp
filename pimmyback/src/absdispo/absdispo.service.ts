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

  statusEtConges = [{
    status: 'Cadres',
    compteurConges: 36
  },
  {
    status: 'Non Cadres Administratif',
    compteurConges: 36
  },
  {
    status: 'Non Cadres Vie Scolaire',
    compteurConges: 51
  }]

  ajoutCPP(absDispo: any) {
    const newDemande = new Abs_dispo();
    console.log(absDispo.status);
    if (absDispo.status == this.statusEtConges[0].status) {
      newDemande.compteur = this.statusEtConges[0].compteurConges;
    } else if (absDispo.status == this.statusEtConges[1].status) {
      newDemande.compteur = this.statusEtConges[1].compteurConges;
    } else if (absDispo.status == this.statusEtConges[2].status) {
      newDemande.compteur = this.statusEtConges[2].compteurConges;
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