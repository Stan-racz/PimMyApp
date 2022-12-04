import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
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
    //ne pas oublier d'ajouter une fonction qui décompte 
    //les jours de congés dispo de l'utilisateur /!\
    return this.DemandeAbsService.create(demandeAbs).pipe()
  }
  // @hasRoles(UserRole.ADMIN, UserRole.MANAGER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  findAllAbs() {
    return this.DemandeAbsService.findAll();
  }
  // @hasRoles(UserRole.ADMIN, UserRole.MANAGER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('absManager/:serviceId')
  findAllManagerNotOk(@Param() params) {
    return this.DemandeAbsService.findAllManagerNotOk(params.serviceId);
  }

  // @hasRoles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('manager_ok')
  findAllAbsManagerOk() {
    return this.DemandeAbsService.findAllManagerOk();
  }

  // @hasRoles(UserRole.ADMIN, UserRole.MANAGER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  //roles : manager admin user
  @Get(':email')
  findByEmail(@Param() params) {
    return this.DemandeAbsService.findByEmail(params.email)
  }

  @Get('/service/:service')
  findByService(@Param() params) {
    return this.DemandeAbsService.findByService(params.service)
  }

  // @hasRoles(UserRole.ADMIN, UserRole.MANAGER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  //roles : manager & admin
  @Put('validationManager')
  managerOk(@Body() body) {
    // console.log(body.email);
    return this.DemandeAbsService.updateValidationManager(body.email)
  }
  // @hasRoles(UserRole.ADMIN, UserRole.MANAGER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  //roles : manager & admin
  @Put('validationAdmin')
  adminOk(@Body() body) {
    // console.log(body.email);
    return this.DemandeAbsService.updateValidationAdmin(body.email)
  }
}