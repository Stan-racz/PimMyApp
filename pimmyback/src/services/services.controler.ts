import { Body, Controller, Get, Post, UseGuards, Delete, Param } from '@nestjs/common';
import { get } from 'http';
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
    // console.log("coucou ajout serv");
    this.servicesServices.create(services["nomService"], services['nomManagerService'], services['prenomManagerService']);
  }

  @hasRoles(UserRole.ADMIN, UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  affichageService() {
    // console.log("coucou c le find all");
    return this.servicesServices.findAll();
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async suppressionService(@Param('id') id) {
    // console.log("delete :) = " + id)
    // console.log('Delete' + id);
    let service = await this.servicesServices.findOne(id);
    return this.servicesServices.deleteOne(service.id);
  }
}