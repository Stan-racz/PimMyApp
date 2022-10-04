import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Demande_abs } from './demandeabs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DemandeAbsService {
  constructor(
    @InjectRepository(Demande_abs)
    private demandeAbsServ: Repository<Demande_abs>,
  ) { }

  findAll(): Promise<Demande_abs[]> {
    return this.demandeAbsServ.find();
  }

  //   findOne(id: number): Promise<Demande_abs> {
  //     return this.demandeAbsServ.findOne(id);
  //   }

  async remove(id: number): Promise<void> {
    await this.demandeAbsServ.delete(id);
  }
}