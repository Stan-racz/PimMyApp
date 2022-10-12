import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DemandeAbsEntity } from './demandeabs.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DemandeAbsService {
  constructor(
    @InjectRepository(DemandeAbsEntity)
    private demandeAbsServ: Repository<DemandeAbsEntity>,
  ) { }

  findAll(): Promise<DemandeAbsEntity[]> {
    return this.demandeAbsServ.find();
  }

  findAllManagerOk(): Promise<DemandeAbsEntity[]> {
    return this.demandeAbsServ.find(
      {
        where: {
          manager_ok: true,
        }
      }
    );
  }

  //   findOne(id: number): Promise<Demande_abs> {
  //     return this.demandeAbsServ.findOne(id);
  //   }

  async remove(id: number): Promise<void> {
    await this.demandeAbsServ.delete(id);
  }


  async create(demandeAbs: DemandeAbsEntity): Promise<void> {
    await this.demandeAbsServ
      .createQueryBuilder()
      .insert()
      .into(DemandeAbsEntity)
      .values([{ commentaire: demandeAbs.commentaire, admin_ok: demandeAbs.admin_ok, date_deb: demandeAbs.date_deb, date_fin: demandeAbs.date_fin, deb_mat: demandeAbs.deb_mat, fin_mat: demandeAbs.fin_mat, manager_ok: demandeAbs.manager_ok }])
      .execute();
  }
}