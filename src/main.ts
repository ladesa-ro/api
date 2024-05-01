import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import 'reflect-metadata';
import { AppModule, EnvironmentConfigService } from '@/infraestrutura';
import { SetupSwaggerDocument } from '@/documentacao/SetupSwaggerDocument';

async function setupApp() {
  const app = await NestFactory.create(AppModule);

  const environmentConfigService = app.get(EnvironmentConfigService);

  //

  const isProduction = environmentConfigService.getRuntimeIsProduction();

  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  //

  app.use(compression());

  //

  const config = SetupSwaggerDocument(environmentConfigService);

  const document = SwaggerModule.createDocument(app, config.build());

  SwaggerModule.setup('doc-api', app, document);

  app.enableCors();

  return app;
}

async function bootstrap() {
  //
  const app = await setupApp();
  const environmentConfigService = app.get(EnvironmentConfigService);
  const port = environmentConfigService.getRuntimePort();
  await app.listen(port);
}

bootstrap();
