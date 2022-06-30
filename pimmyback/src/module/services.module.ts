import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/entity/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Services])],
  exports: [TypeOrmModule]
})
export class ServicesModule {}