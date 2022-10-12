import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeAbsController } from './demandeabs.controller';
import { DemandeAbsEntity } from './demandeabs.entity';
import { DemandeAbsService } from './demandeabs.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemandeAbsEntity])],
  controllers: [DemandeAbsController],
  providers: [DemandeAbsService],
  exports: [DemandeAbsService]
})
export class DemandeAbsModule { } 