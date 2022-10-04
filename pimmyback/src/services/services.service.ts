import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from './services.entity';
import { Repository } from 'typeorm';

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

  async remove(id: number): Promise<void> {
    await this.utilServ.delete(id);
  }
}