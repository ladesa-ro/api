import { AppModulesModule } from "@/business-logic/resources/app-modules.module";
import { AuthenticationModule } from "@/infrastructure/authentication";
import { AppConfigModule } from "@/infrastructure/config";
import { IntegrationsModule } from "@/infrastructure/integrations";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";

@Module({
  imports: [
    //
    AppConfigModule,
    IntegrationsModule,
    AuthenticationModule,
    AppModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
