import { Module, forwardRef } from '@nestjs/common';
import { UserService } from '../service/user.service'
import { UserController } from '../controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntitiy } from '../entity/user.entity';
import { AuthModule } from './auth.module';
import { AuthService } from 'src/service/auth.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntitiy]), forwardRef(() => UserModule),],
  providers: [UserService, AuthService, JwtService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
