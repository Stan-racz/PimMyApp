import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/models/user.interface';
import { DemandeAbsEntity } from './demandeabs.entity';
import { DemandeAbsService } from './demandeabs.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller('demandeAbs')
export class DemandeAbsController {
  constructor(private readonly DemandeAbsService: DemandeAbsService) { }

  @Post()
  createDemandeAbs(@Body() demandeAbs: DemandeAbsEntity) {
    return this.DemandeAbsService.create(demandeAbs)
  }

  // @hasRoles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('manager_ok')
  findAllAbsManagerOk() {
    return this.DemandeAbsService.findAllManagerOk();
  }
}