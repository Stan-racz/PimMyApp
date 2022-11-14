import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DemandeAbsEntity } from './demandeabs.entity';
import { Repository } from 'typeorm';
import { catchError, from, map, Observable, throwError } from 'rxjs';


@Injectable()
export class DemandeAbsService {
  constructor(
    @InjectRepository(DemandeAbsEntity)
    private demandeAbsServ: Repository<DemandeAbsEntity>,
  ) { }

  findAll(): Promise<DemandeAbsEntity[]> {
    return this.demandeAbsServ.find({ relations: ['id_absence'] });
  }

  findAllManagerOk(): Promise<DemandeAbsEntity[]> {
    return this.demandeAbsServ.find(
      {
        relations: ['id_absence'],
        where: {
          manager_ok: true,
          admin_ok: false
        }
      }
    );
  }

  findAllManagerNotOk(): Promise<DemandeAbsEntity[]> {
    console.log("cc la manager validation");

    return this.demandeAbsServ.find(
      {
        relations: ['id_absence'],
        where: {
          manager_ok: false,
          admin_ok: false,
        }
      }
    );
  }

  async remove(id: number): Promise<void> {
    await this.demandeAbsServ.delete(id);
  }


  create(demandeAbs: DemandeAbsEntity): Observable<DemandeAbsEntity> {
    const newDemande = new DemandeAbsEntity();

    newDemande.date_deb = demandeAbs.date_deb;
    newDemande.deb_mat = demandeAbs.deb_mat;
    newDemande.date_fin = demandeAbs.date_fin;
    newDemande.fin_mat = demandeAbs.fin_mat;
    newDemande.commentaire = demandeAbs.commentaire;
    newDemande.manager_ok = demandeAbs.manager_ok;
    newDemande.admin_ok = demandeAbs.admin_ok;
    newDemande.id_absence = demandeAbs.id_absence;
    newDemande.email = demandeAbs.email;
    newDemande.refus = false;
    newDemande.user_info = demandeAbs.user_info;
    return from(this.demandeAbsServ.save(newDemande)).pipe(
      map((demandeAbs: DemandeAbsEntity) => {
        return demandeAbs;
      }),
    )
  }

  findByEmail(email: string) {
    return this.demandeAbsServ.find(
      {
        relations: {
          id_absence: true,
          user_info: {
            id_service: true,
          },
        },
        where: {
          email: email
        }
      }
    )
  }

  updateValidationManager(email: string) {
    return this.demandeAbsServ.update(
      {
        email: email
      },
      {
        manager_ok: true,
      }
    )
  }

  updateValidationAdmin(email: string) {
    return this.demandeAbsServ.update(
      {
        email: email
      },
      {
        admin_ok: true,
      }
    )
  }

  // create(demandeAbs: DemandeAbsEntity): Observable<DemandeAbsEntity> {
  //   return this.demandeAbsServ
  //     .createQueryBuilder()
  //     .insert()
  //     .into(DemandeAbsEntity)
  //     .values([{
  //       commentaire: demandeAbs.commentaire,
  //       admin_ok: demandeAbs.admin_ok,
  //       date_deb: demandeAbs.date_deb,
  //       date_fin: demandeAbs.date_fin,
  //       deb_mat: demandeAbs.deb_mat,
  //       fin_mat: demandeAbs.fin_mat,
  //       manager_ok: demandeAbs.manager_ok,
  //       id_absence: demandeAbs.id_absence,
  //     }])
  //     .execute();
  // }
}