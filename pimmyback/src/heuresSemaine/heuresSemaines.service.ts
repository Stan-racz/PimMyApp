import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeuresSemaine } from './heuressemaine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeuresSemaineService {
  constructor(
    @InjectRepository(HeuresSemaine)
    private utilServ: Repository<HeuresSemaine>,
  ) { }

  findAll(): Promise<HeuresSemaine[]> {
    return this.utilServ.find();
  }

  //   findOne(id: number): Promise<Services> {
  //     return this.utilServ.findOne(id);
  //   }

  async remove(id: number): Promise<void> {
    await this.utilServ.delete(id);
  }
}