import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AbsenceController } from './absence.controller';
import { Absence } from './absence.entity';
import { AbsenceService } from './absence.service';

@Module({
    imports: [TypeOrmModule.forFeature([Absence])],
    controllers: [AbsenceController],
    providers: [AbsenceService],
    exports: [AbsenceService]
})
export class AbsenceModule { } 