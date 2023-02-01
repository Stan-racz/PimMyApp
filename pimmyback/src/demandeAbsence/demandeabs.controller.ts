import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AbsDispoModule } from 'src/absdispo/absdispo.module';
import { AbsDispoService } from 'src/absdispo/absdispo.service';
import { AbsenceService } from 'src/absences/absence.service';
import { UserService } from 'src/user/user.service';
import { DemandeAbsEntity } from './demandeabs.entity';
import { DemandeAbsService } from './demandeabs.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller('demandeAbs')
export class DemandeAbsController {
  constructor(
    private readonly DemandeAbsService: DemandeAbsService,
    private readonly absDispoService: AbsDispoService,
    private readonly UserService: UserService,
    private readonly AbsenceService: AbsenceService,
  ) { }

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
  @Get('absManagerNotOk/:serviceId')
  findAllManagerNotOk(@Param() params) {
    return this.DemandeAbsService.findAllManagerNotOk(params.serviceId);
  }
  // @hasRoles(UserRole.ADMIN, UserRole.MANAGER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('absManager/:serviceId')
  findAllManager(@Param() params) {
    return this.DemandeAbsService.findAllManager(params.serviceId);
  }

  // @hasRoles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('manager_ok')
  findAllAbsManagerOk() {
    return this.DemandeAbsService.findAllManagerOk();
  }

    // @hasRoles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('manager_ok/:service')
  findAllAbsManagerOkService(@Param() params) {
    return this.DemandeAbsService.findAllManagerOkService(params.service);
  }

  // @hasRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
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
    // console.log("lololo", body.data);
    return this.DemandeAbsService.updateValidationManager(body.data.email, body.data.id)
  }

  // @hasRoles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  //roles : admin
  @Put('validationAdmin')
  adminOk(@Body() body) {
    
    return this.UserService.findByEmail(
      body.data.email
      ).subscribe(
        (user) => {
          this.AbsenceService.findByName(body.data.id_absence).subscribe(
            (absence) => {
              // console.log("lol", absence);
            this.absDispoService.updateConge(absence, user, body.data.id);
            if (absence.nbJour == null) {
              this.DemandeAbsService.updateValidationAdmin(user.email, body.data.id)
            }
          }
        )
      }
    )
  }

  // @hasRoles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  //roles : admin
  @Put('refusAdmin')
  adminRefus(@Body() body) {
    // console.log("lol", body);
    return this.UserService.findByEmail(
      body.data.email
    ).subscribe(
      (user) => {
        this.AbsenceService.findByName(body.data.id_absence).subscribe(
          (absence) => {

            this.DemandeAbsService.updateRefusAdmin(user.email, body.data.id)

          }
        )
      }
    )
  }

  // @hasRoles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  //roles : admin
  @Put('refusManager')
  managerRefus(@Body() body) {
    // console.log("lol", body);
    return this.UserService.findByEmail(
      body.data.email
    ).subscribe(
      (user) => {
        this.AbsenceService.findByName(body.data.id_absence).subscribe(
          (absence) => {
            this.DemandeAbsService.updateRefusManager(user.email, body.data.id)
          }
        )
      }
    )
  }

  @Get('dernier/:nombre')
  dernierId(@Param() params) {
    return this.DemandeAbsService.dernierId(params.nombre)
  }
}