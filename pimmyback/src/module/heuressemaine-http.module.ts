import { Module } from "@nestjs/common";
import { HeuresSemaineController } from "src/controller/heuressemaine.controllers";
import { HeuresSemaineService } from "src/service/heuresSemaines.service";
import { HeuresSemaineModule } from "./heuressemaine.module";

@Module({
    imports: [HeuresSemaineModule],
    providers: [HeuresSemaineService],
    controllers: [HeuresSemaineController]
  })
  export class ServicesHttpModule {}