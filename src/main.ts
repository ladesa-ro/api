import { SetupSwaggerDocument } from '@/documentacao/SetupSwaggerDocument';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import 'reflect-metadata';
import { EnvironmentConfigService } from './config';
import { MainModule } from './main.module';

async function setupApp() {
  const app = await NestFactory.create(MainModule);

  const environmentConfigService = app.get(EnvironmentConfigService);

  //

  const isProduction = environmentConfigService.getRuntimeIsProduction();

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
      contentSecurityPolicy: isProduction ? undefined : false,
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
