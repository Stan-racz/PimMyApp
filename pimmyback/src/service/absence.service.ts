import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Absence } from 'src/entity/absence.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AbsenceService {
  constructor(
    @InjectRepository(Absence)
    private absServ: Repository<Absence>,
  ) {}

  findAll(): Promise<Absence[]> {
    return this.absServ.find();
  }

//   findOne(id: number): Promise<Absence> {
//     return this.absServ.findOne(id);
//   }

  async remove(id: number): Promise<void> {
    await this.absServ.delete(id);
  }
}