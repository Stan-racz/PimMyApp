import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AbsenceService } from 'src/absences/absence.service';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/models/user.interface';
import { UserService } from 'src/user/user.service';
import { DemandeAbsEntity } from './demandeabs.entity';
import { DemandeAbsService } from './demandeabs.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller('demandeAbs')
export class DemandeAbsController {
  constructor(private readonly DemandeAbsService: DemandeAbsService, private readonly UserService: UserService, private readonly AbsenceService: AbsenceService) { }

  @Post('create')
  createDemandeAbs(@Body() demandeAbs: DemandeAbsEntity): Observable<DemandeAbsEntity | Object> {
    // var temp = await this.UserService.findByMail(demandeAbs.email)
    // demandeAbs.id_utilisateur = temp[0].id
    // var temp2 = await this.AbsenceService.findByName(demande)
    console.log(demandeAbs);

    return this.DemandeAbsService.create(demandeAbs).pipe()
  }

  @Get('all')
  findAllAbs() {
    return this.DemandeAbsService.findAll();
  }

  // @hasRoles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('manager_ok')
  findAllAbsManagerOk() {
    return this.DemandeAbsService.findAllManagerOk();
  }

  @Get(':email')
  findByEmail(@Param() params) {
    return this.DemandeAbsService.findByEmail( params.email)
  }
}