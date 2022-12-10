import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeAbsModule } from 'src/demandeAbsence/demandeAbs.module';
import { UserModule } from 'src/user/user.module';
import { AbsDispoController } from './absdispo.controller';
import { Abs_dispo } from './absdispo.entity';
import { AbsDispoService } from './absdispo.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Abs_dispo]),
        forwardRef(() => UserModule),
        forwardRef(() => DemandeAbsModule)
    ],
    controllers: [AbsDispoController],
    providers: [AbsDispoService],
    exports: [AbsDispoService]
})
export class AbsDispoModule { } 