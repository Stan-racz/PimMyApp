import { ServicesService } from "./services.service";
import { ServicesModule } from "./services.module";
import { Module } from "@nestjs/common";
import { ServicesController } from "./services.controler";

@Module({
  imports: [ServicesModule],
  providers: [ServicesService],
  controllers: [ServicesController]
})
export class ServicesHttpModule { }