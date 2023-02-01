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
    return this.demandeAbsServ.find({
      relations: {
        id_absence: true,
        user_info: {
          id_service: true,
        },
      },
    });
  }

  findbyId(demandeCongeId: number): Promise<DemandeAbsEntity> {
    return this.demandeAbsServ.findOne({
      relations: {
        id_absence: true,
        user_info: {
          id_service: true,
        },
      },
      where: {
        id: demandeCongeId
      }
    });
  }

  findAllManagerOk(): Promise<DemandeAbsEntity[]> {
    return this.demandeAbsServ.find(
      {
        relations: {
          id_absence: true,
          user_info: {
            id_service: true,
          },
        },
        where: {
          manager_ok: true,
          admin_ok: false,
          refus: false
        }
      }
    );
  }
  findAllManagerOkService(idService: number): Promise<DemandeAbsEntity[]> {
    return this.demandeAbsServ.createQueryBuilder('DemandeAbsEntity')
      .select()
      .addSelect('DemandeAbsEntity.id', 'id')
      .addSelect('DemandeAbsEntity.date_deb', 'date_deb')
      .addSelect('DemandeAbsEntity.deb_mat', 'deb_mat')
      .addSelect('DemandeAbsEntity.date_fin', 'date_fin')
      .addSelect('DemandeAbsEntity.fin_mat', 'fin_mat')
      .addSelect('DemandeAbsEntity.commentaire', 'commentaire')
      .addSelect('DemandeAbsEntity.manager_ok', 'manager_ok')
      .addSelect('DemandeAbsEntity.admin_ok', 'admin_ok')
      .addSelect('DemandeAbsEntity.email', 'email')
      .addSelect('DemandeAbsEntity.refus', 'refus')
      .addSelect('user.nom', 'user_nom')
      .addSelect('user.prenom', 'user_prenom')
      .addSelect('srv.nom', 'service_nom')
      .addSelect('abs.nom', 'abs_nom')
      .innerJoin('user_entity', 'user', 'DemandeAbsEntity.userInfoId=user.id')
      .innerJoin('services', 'srv', 'user.idServiceId=srv.id')
      .innerJoin('absence', 'abs', 'DemandeAbsEntity.idAbsenceId=abs.id')
      .where('srv.id=' + idService)
      .andWhere('manager_ok=1')
      .andWhere('admin_ok=0')
      .andWhere('refus=0')
      .getRawMany()
  }

  findAllManagerNotOk(idService: number): Promise<DemandeAbsEntity[]> {
    // console.log("cc la manager validation", idService);
    return this.demandeAbsServ.createQueryBuilder('DemandeAbsEntity')
      .select()
      .addSelect('DemandeAbsEntity.id', 'id')
      .addSelect('DemandeAbsEntity.date_deb', 'date_deb')
      .addSelect('DemandeAbsEntity.deb_mat', 'deb_mat')
      .addSelect('DemandeAbsEntity.date_fin', 'date_fin')
      .addSelect('DemandeAbsEntity.fin_mat', 'fin_mat')
      .addSelect('DemandeAbsEntity.commentaire', 'commentaire')
      .addSelect('DemandeAbsEntity.manager_ok', 'manager_ok')
      .addSelect('DemandeAbsEntity.admin_ok', 'admin_ok')
      .addSelect('DemandeAbsEntity.email', 'email')
      .addSelect('DemandeAbsEntity.refus', 'refus')
      .addSelect('user.nom', 'user_nom')
      .addSelect('user.prenom', 'user_prenom')
      .addSelect('srv.nom', 'service_nom')
      .addSelect('abs.nom', 'abs_nom')
      .innerJoin('user_entity', 'user', 'DemandeAbsEntity.userInfoId=user.id')
      .innerJoin('services', 'srv', 'user.idServiceId=srv.id')
      .innerJoin('absence', 'abs', 'DemandeAbsEntity.idAbsenceId=abs.id')
      .where('srv.id=' + idService)
      .andWhere('manager_ok=0')
      .andWhere('admin_ok=0')
      .andWhere('refus=0')
      .getRawMany()
  }
  
  findAllManager(idService: number): Promise<DemandeAbsEntity[]> {
    // console.log("cc la manager validation", idService);
    return this.demandeAbsServ.createQueryBuilder('DemandeAbsEntity')
      .select()
      .addSelect('DemandeAbsEntity.id', 'id')
      .addSelect('DemandeAbsEntity.date_deb', 'date_deb')
      .addSelect('DemandeAbsEntity.deb_mat', 'deb_mat')
      .addSelect('DemandeAbsEntity.date_fin', 'date_fin')
      .addSelect('DemandeAbsEntity.fin_mat', 'fin_mat')
      .addSelect('DemandeAbsEntity.commentaire', 'commentaire')
      .addSelect('DemandeAbsEntity.manager_ok', 'manager_ok')
      .addSelect('DemandeAbsEntity.admin_ok', 'admin_ok')
      .addSelect('DemandeAbsEntity.email', 'email')
      .addSelect('DemandeAbsEntity.refus', 'refus')
      .addSelect('user.nom', 'user_nom')
      .addSelect('user.prenom', 'user_prenom')
      .addSelect('srv.nom', 'service_nom')
      .addSelect('abs.nom', 'abs_nom')
      .innerJoin('user_entity', 'user', 'DemandeAbsEntity.userInfoId=user.id')
      .innerJoin('services', 'srv', 'user.idServiceId=srv.id')
      .innerJoin('absence', 'abs', 'DemandeAbsEntity.idAbsenceId=abs.id')
      .where('srv.id=' + idService)
      .andWhere('manager_ok=0')
      .andWhere('admin_ok=0')
      .andWhere('refus=0')
      .getRawMany()
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

  findByService(service: any) {
    return this.demandeAbsServ.createQueryBuilder('DemandeAbsEntity')
      .select()
      .addSelect('DemandeAbsEntity.id', 'id')
      .addSelect('DemandeAbsEntity.date_deb', 'date_deb')
      .addSelect('DemandeAbsEntity.deb_mat', 'deb_mat')
      .addSelect('DemandeAbsEntity.date_fin', 'date_fin')
      .addSelect('DemandeAbsEntity.fin_mat', 'fin_mat')
      .addSelect('DemandeAbsEntity.commentaire', 'commentaire')
      .addSelect('DemandeAbsEntity.manager_ok', 'manager_ok')
      .addSelect('DemandeAbsEntity.admin_ok', 'admin_ok')
      .addSelect('DemandeAbsEntity.email', 'email')
      .addSelect('DemandeAbsEntity.refus', 'refus')
      .addSelect('user.nom', 'user_nom')
      .addSelect('user.prenom', 'user_prenom')
      .addSelect('srv.nom', 'service_nom')
      .addSelect('abs.nom', 'abs_nom')
      .innerJoin('user_entity', 'user', 'DemandeAbsEntity.userInfoId=user.id')
      .innerJoin('services', 'srv', 'user.idServiceId=srv.id')
      .innerJoin('absence', 'abs', 'DemandeAbsEntity.idAbsenceId=abs.id')
      .where('srv.id=' + service)
      // .andWhere('manager_ok=1')
      // .andWhere('refus=0')
      .getRawMany()
  }

  updateValidationManager(email: string, demandeAbsId: number) {
    // console.log("slt", email, demandeAbsId);
    return this.demandeAbsServ.update(
      {
        email: email,
        id: demandeAbsId
      },
      {
        manager_ok: true,
      }
    )
  }

  updateValidationAdmin(email: string, demandeAbsId: number) {
    return this.demandeAbsServ.update(
      {
        email: email,
        id: demandeAbsId
      },
      {
        admin_ok: true,
      }
    )
  }

  updateRefusAdmin(email: string, demandeAbsId: number) {
    return this.demandeAbsServ.update(
      {
        email: email,
        id: demandeAbsId
      },
      {
        refus: true,
      }
    )
  }

  updateRefusManager(email: string, demandeAbsId: number) {
    return this.demandeAbsServ.update(
      {
        email: email,
        id: demandeAbsId
      },
      {
        refus: true,
      }
    )
  }

  dernierId(nombre) {
    return this.demandeAbsServ.createQueryBuilder('DemandeAbsEntity')
      .select()
      .addSelect('DemandeAbsEntity.id', 'id')
      .orderBy('DemandeAbsEntity.id', 'DESC')
      .limit(nombre)
      .getRawMany()
  }
}