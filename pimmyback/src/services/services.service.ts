import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from './services.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { stringify } from 'querystring';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private utilServ: Repository<Services>,
  ) { }

  findAll(): Promise<Services[]> {
    return this.utilServ.find();
  }

  async create(nomService: string, nomManagerService: string, prenomManagerService: string) {
    return await this.utilServ.createQueryBuilder().insert().into(Services).values([{ nom: nomService, manager_Nom: nomManagerService, manager_Prenom: prenomManagerService }]).execute();
  }

  //   findOne(id: number): Promise<Services> {
  //     return this.utilServ.findOne(id);
  //   }

  async findOne(nom: string): Promise<Services> {
    return await this.utilServ.findOne({
      where: {
        nom: nom
      }
    });
  }

  deleteOne(id: number): Observable<any> {
    return from(this.utilServ.delete(id));
  }

}