import { Module } from "@nestjs/common";
import { DemandeabsController } from "src/controller/demandeabs.controller";
import { DemandeAbsService } from "src/service/demandeabs.service";
import { DemandeAbsModule } from "./demandeabs.module";

@Module({
    imports: [DemandeAbsModule],
    providers: [DemandeAbsService],
    controllers: [DemandeabsController]
  })
  export class DemandeAbsHttpModule {}