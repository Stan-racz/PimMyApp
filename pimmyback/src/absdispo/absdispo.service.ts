import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Abs_dispo } from './absdispo.entity';
import { Equal, Repository } from 'typeorm';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { Absence } from 'src/absences/absence.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { DemandeAbsService } from 'src/demandeAbsence/demandeabs.service';


@Injectable()
export class AbsDispoService {
  constructor(
    @InjectRepository(Abs_dispo)
    private absDispoServ: Repository<Abs_dispo>,
    private demandeAbsServ: DemandeAbsService,
  ) { }

  findAll(): Promise<Abs_dispo[]> {
    return this.absDispoServ.find();
  }

  findnbJourUserMotif(abs: Absence, user: UserEntity): Promise<Abs_dispo> {
    return this.absDispoServ.findOne(
      {
        relations: {
          id_abs: true,
          id_util: {
            id_service: true,
          },
        },
        where: {
          id_util: Equal(user.id),
          id_abs: Equal(abs.id)
        }
      }
    );
  }

  //   findOne(id: number): Promise<Abs_dispo> {
  //     return this.absDispoServ.findOne(id);
  //   }

  async remove(id: number): Promise<void> {
    await this.absDispoServ.delete(id);
  }

  async ajoutConge(absence: Absence, user: UserEntity) {
    // console.log("JE SUIS APPELE SALUT");

    return await
      this.absDispoServ
        .createQueryBuilder()
        .insert()
        .into(Abs_dispo)
        .values(
          [
            {
              nbJour: absence.nbJour,
              id_abs: absence,
              id_util: user,
            }
          ]
        )
        .execute();
  }

  async updateConge(absence: Absence, user: UserEntity, demandeCongeId: number) {
    let totalDays;
    var absDispo = await this.findnbJourUserMotif(absence, user);
    var demandeAbs = await this.demandeAbsServ.findbyId(demandeCongeId);
    let date_1 = new Date(demandeAbs.date_deb);
    let date_2 = new Date(demandeAbs.date_fin);

    if (date_1.getTime() == date_2.getTime()) {
      totalDays = 1
    } else {
      let difference = date_1.getTime() - date_2.getTime();
      totalDays = Math.abs(Math.ceil(difference / (1000 * 3600 * 24)));
    }

    if (absDispo?.nbJour != null) {
      if (absence.nom == "Congés sans solde") {
        await this.absDispoServ.query(
          `UPDATE abs_dispo 
          SET nbJour = nbJour + ${totalDays} 
          WHERE id_util = ${user.id} 
          AND idAbsId = ${absence.id}`
        )
        await this.demandeAbsServ.updateValidationAdmin(user.email, demandeCongeId)
      }
      if (absDispo?.nbJour > totalDays && absence.nom != "Congés sans solde") {
        await this.absDispoServ.query(
          `UPDATE abs_dispo
          SET nbJour = nbJour - ${totalDays} 
          WHERE id_util = ${user.id} 
          AND idAbsId = ${absence.id}`
        )
        await this.demandeAbsServ.updateValidationAdmin(user.email, demandeCongeId)
      } else {
        catchError(err => throwError(() => new Error("Pas assez de jours de congés disponible")))
      }
    }
  }
}