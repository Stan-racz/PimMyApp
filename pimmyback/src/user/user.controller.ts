import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserEntity } from './models/user.entity';
import { User, UserRole } from './models/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    leRole: string;
    constructor(private userService: UserService) { }
    @Post()
    create(@Body() user: UserEntity): Observable<User | Object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }
    @Post('login')
    login(@Body() user: User): Observable<Object> {

        this.userService.findByMail(user['email']).subscribe((value) => this.leRole = value['role']);
        console.log(user)
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                console.log()
                return { access_token: jwt, role: this.leRole, userEmail: user.email };
            })
        )
    }
    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id);
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
