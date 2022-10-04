import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/models/user.interface';
import { Services } from './services.entity';
import { ServicesService } from './services.service';

//on peut donner une route a un controller (ici localhost:3000/hello/world va retourner getHello. Aucune autre route ne la retournera)
@Controller('services')
export class ServicesController {

  constructor(private readonly servicesServices: ServicesService) { }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  ajoutService(@Body() services: Services): void {
    this.servicesServices.create(services["nom"], services['nomManagerService'], services['prenomManagerService']);
  }

}