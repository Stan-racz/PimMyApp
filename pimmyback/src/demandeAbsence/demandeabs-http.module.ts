import { Module } from '@nestjs/common';
import { DemandeAbsModule } from './demandeabs.module';
import { DemandeAbsService } from './demandeabs.service';
import { DemandeAbsController } from './demandeabs.controller';

@Module({
  imports: [DemandeAbsModule],
  providers: [DemandeAbsService],
  controllers: [DemandeAbsController],
})
export class DemandeAbsHttpModule { }
