import { AppModulesModule } from "@/business-logic/resources/app-modules.module";
import { AdaptersModule } from "@/infrastructure/adapters";
import { AuthenticationModule } from "@/infrastructure/authentication";
import { AppConfigModule } from "@/infrastructure/config";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";

@Module({
  imports: [
    //
    AppConfigModule,
    AdaptersModule,
    AuthenticationModule,
    AdaptersModule,
    AppModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
