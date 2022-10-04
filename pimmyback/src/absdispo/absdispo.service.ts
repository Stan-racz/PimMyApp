import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Abs_dispo } from './absdispo.entity';
import { Repository } from 'typeorm';

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
}