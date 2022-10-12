import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Absence } from './absence.entity';
import { Repository } from 'typeorm';
import { catchError, from, map, Observable, throwError } from 'rxjs';

@Injectable()
export class AbsenceService {
  constructor(
    @InjectRepository(Absence)
    private absServ: Repository<Absence>,
  ) { }

  findAll(): Promise<Absence[]> {
    return this.absServ.find();
  }

  findByName(nom: string): Observable<Absence> {
    return from(this.absServ.findOne({
        where: {
            nom: nom,
            
        }
    })).pipe(
        map((absence: Absence) => {
            const { ...result } = absence;
            return result;
        }),
        catchError(err => throwError(() => new Error("Pas d'absence correspondant à ce nom")))
    );
}

  async remove(id: number): Promise<void> {
    await this.absServ.delete(id);
  }
}