import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { catchError, combineLatest, forkJoin, map, mergeMap, Observable, of, switchMap, throwError } from 'rxjs';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserEntity } from './models/user.entity';
import { User, UserRole } from './models/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    leRole: string;
    userId: number;
    idService: number;
    constructor(private userService: UserService) { }
    @Post()
    create(@Body() user: UserEntity): Observable<User | Object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
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
