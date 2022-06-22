import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demande_abs } from 'src/entity/demandeabs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demande_abs])],
  exports: [TypeOrmModule]
})
export class DemandeAbsModule {}