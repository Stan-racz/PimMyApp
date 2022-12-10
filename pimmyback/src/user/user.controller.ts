import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { catchError, forkJoin, map, Observable, of, throwError } from 'rxjs';
import { AbsenceService } from '../absences/absence.service';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserEntity } from './models/user.entity';
import { User, UserRole } from './models/user.interface';
import { UserService } from './user.service';
import { Absence } from 'src/absences/absence.entity';
import { AbsDispoService } from 'src/absdispo/absdispo.service';

@Controller('users')
export class UserController {

  leRole: string;
  userId: number;
  motifsAbsence: Absence[] = [];
  idService: number;
  constructor(
    private userService: UserService,
    private absenceService: AbsenceService,
    private absDispoService: AbsDispoService,
  ) { }

  //Observable<User | Object> :(type retour fonction)
  @Post()
  create(@Body() user: UserEntity) {
    //1 - Je récupère tous les motifs de congés
    // 2 - Pour tous les motifs : 
    //       ○ Si mon motif à un nbJour =! Null alors
    //          § J'ajoute dans abs_dispo =>  l'id de mon user	L'id du motif d'abs	Le nb jours

    // console.log(this.motifsAbsence);
    this.userService.create(user).subscribe(
      (user: UserEntity) => {
        // console.log("ptdr", user);
        this.absenceService.findAll().then(
          (absences) => {
            absences.forEach(
              (absence) => {
                console.log(absence);
                if (absence.nbJour != null) {
                  if (absence.nom == "Congés Payés") {
                    if (user.nbHeureContractuelle == 1470) {
                      absence.nbJour = 36;
                    } else if (user.nbHeureContractuelle == 1558) {
                      absence.nbJour = 51;
                    }
                  }
                  this.motifsAbsence.push(absence);
                }
              }
            )
            // console.log(this.motifsAbsence);
            // console.log(user);
            // console.log("LA LONGUEUR", this.motifsAbsence.length);
            this.motifsAbsence.forEach(
              (absence) => {
                // console.log("pk ça insert 2 fois", absence);
                this.absDispoService.ajoutConge(absence, user)
              }
            )
          }
        )
      }
    )
  }

  @Post('login')
  login(
    @Body() userCredentials: User,
  ): Observable<{ access_token: string; role: UserRole; userEmail: string; serviceId: number; userId: number; }> {
    /**
     * forkJoin require all input observables to be completed
     */
    return forkJoin([
      this.userService.findByEmail(userCredentials.email),
      this.userService.login(userCredentials),
    ]).pipe(
      map(([findedUser, token]) => ({
        access_token: token,
        userEmail: findedUser.email,
        role: findedUser.role,
        userId: findedUser.id,
        serviceId: findedUser?.id_service,
      })),
      catchError((err) => throwError(() => err.message)),
    );
  }

  @Get(':id')
  findOne(@Param() params): Observable<User> {
    return this.userService.findOne(params.id);
  }

  @Get('email/:email')
  findByEmail(@Param() params) {
    // console.log(params.email);
    return this.userService.findByEmail(params.email);
  }

  @Get(':nom/:prenom')
  findByName(@Param() params): Observable<User> {
    return this.userService.findByName(params.nom, params.prenom);
  }

  @hasRoles(UserRole.MANAGER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<User> {
    console.log("update user" + id);
    return this.userService.deleteOne(Number(id));
  }
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    console.log("update user" + id);
    return this.userService.updateOne(Number(id), user);
  }
}
