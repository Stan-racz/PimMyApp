import { Injectable, Logger } from '@nestjs/common';
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

  findById(id: number): Observable<Absence> {
    return from(this.absServ.findOne({
      where: {
        id: id,

      }
    })).pipe(
      map((absence: Absence) => {
        const { ...result } = absence;
        return result;
      }),
      catchError(err => throwError(() => new Error("Pas d'absence correspondant à cet id")))
    );
  }

  async remove(id: number): Promise<void> {
    await this.absServ.delete(id);
  }

  async create(nom: string) {
    // console.log("service ! ", nom);
    return await this.absServ.createQueryBuilder().insert().into(Absence).values([{ nom: nom }]).execute();
  }

  deleteOne(id: number): Observable<any> {
    return from(this.absServ.delete({ id: id }));
  }
}