import { Module } from "@nestjs/common";
import { AbsenceController } from "src/controller/absence.controller";
import { AbsenceService } from "src/service/absence.service";
import { AbsenceModule } from "./absence.module";

@Module({
    imports: [AbsenceModule],
    providers: [AbsenceService],
    controllers: [AbsenceController]
  })
  export class AbsenceHttpModule {}