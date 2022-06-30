import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abs_dispo } from 'src/entity/absdispo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abs_dispo])],
  exports: [TypeOrmModule]
})
export class AbsDispoModule {}