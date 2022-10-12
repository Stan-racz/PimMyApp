import { DemandeAbsService } from "./demandeAbs.service";
import { DemandeAbsModule } from "./demandeAbs.module";
import { Module } from "@nestjs/common";
import { DemandeAbsController } from "./demandeabs.controller";

@Module({
    imports: [DemandeAbsModule],
    providers: [DemandeAbsService],
    controllers: [DemandeAbsController]
})
export class DemandeAbsHttpModule { }