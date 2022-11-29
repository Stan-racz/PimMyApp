import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/models/user.interface';
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


  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  ajoutService(@Body() absence: Absence): void {
    console.log("controller : ", absence);
    this.absenceService.create(absence["nom"]);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async suppressionAbs(@Param('id') id) {
    // console.log("delete :) = " + id)
    // console.log('Delete' + id);
    // let service = await this.absenceService.findById(id);
    return this.absenceService.deleteOne(id);
  }

}