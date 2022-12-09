import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsDispoModule } from 'src/absdispo/absdispo.module';
import { AbsenceModule } from 'src/absences/absence.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from './models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    AbsenceModule,
    AbsDispoModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
