import { ServicesService } from "src/service/services.service";
import { ServicesModule } from "./services.module";
import { Module } from "@nestjs/common";
import { ServicesController } from "src/controller/services.controler";

@Module({
    imports: [ServicesModule],
    providers: [ServicesService],
    controllers: [ServicesController]
  })
  export class ServicesHttpModule {}