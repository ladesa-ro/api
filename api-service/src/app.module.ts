import { BusinessLogicModule } from "@/business-logic/business-logic.module";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";

@Module({
  imports: [BusinessLogicModule, InfrastructureModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
