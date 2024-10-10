import { AppConfigService } from "@/infrastructure/config";
import { SetupSwaggerDocument } from "@/infrastructure/integrations/http/swagger";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import compression from "compression";
import helmet from "helmet";
import "reflect-metadata";
import { AppModule } from "./app.module";

async function setupApp() {
  const app = await NestFactory.create(AppModule);

  //
  const configService = app.get(AppConfigService);
  //

  const prefix = configService.getRuntimePrefix();

  if (prefix) {
    app.setGlobalPrefix(prefix, { exclude: ["health"] });
  }

  //

  app.use(helmet());

  //

  app.use(compression());

  //
  const config = SetupSwaggerDocument(configService);
  const document = SwaggerModule.createDocument(app, config.build());
  //
  SwaggerModule.setup(`${prefix ?? ""}doc-api`, app, document);
  //

  app.enableCors();

  return app;
}

async function bootstrap() {
  //
  const app = await setupApp();
  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.getRuntimePort();
  await app.listen(port);
}

bootstrap();
