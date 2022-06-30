import { Module } from "@nestjs/common";
import { AbsDispoController } from "src/controller/absdispo.controller";
import { AbsDispoService } from "src/service/absdispo.service";
import { AbsDispoModule } from "./absdispo.module";

@Module({
    imports: [AbsDispoModule],
    providers: [AbsDispoService],
    controllers: [AbsDispoController]
  })
  export class AdsDispoHttpModule {}