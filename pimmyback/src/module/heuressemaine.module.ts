import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeuresSemaine } from 'src/entity/heuressemaine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HeuresSemaine])],
  exports: [TypeOrmModule]
})
export class HeuresSemaineModule {}