import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Absence } from './absence.entity';
import { AbsenceService } from './absence.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller("absences")
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) { }

  @Get()
  findAll(): Promise<Absence[]> {
    return this.absenceService.findAll();
  }

  @Get(':id')
  findById(@Param() params): Observable<Absence> {
    return this.absenceService.findById(params.id);
  }


}