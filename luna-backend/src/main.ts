import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { AppModule } from './application/app.module';
import { EnvironmentConfigService } from './infrastructure/environment-config';
import { getModuleHelmet } from './infrastructure/utils/modules/helmet/modules.helmet';

async function bootstrap() {
  //

  const app = await NestFactory.create(AppModule);

  const environmentConfigService = app.get(EnvironmentConfigService);

  //

  const isProduction = environmentConfigService.getRuntimeIsProduction();
  const isDevelopment = environmentConfigService.getRuntimeIsDevelopment();

  //

  const helmet = await getModuleHelmet();

  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  //

  app.use(compression());

  //

  const config = new DocumentBuilder();

  config.setTitle('SISGEA - Luna - API');
  config.setDescription('API para a consulta e manipulação de dados e procedimentos relacionados ao Sistema de Gestão Acadêmico.');
  config.setVersion('0.0');

  config.addServer('https://luna.sisgha.com/api/');

  if (isDevelopment) {
    config.addServer('http://localhost:3000/');
  }

  config.addBearerAuth();

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('doc-api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  //

  const port = environmentConfigService.getRuntimePort();

  app.enableCors();

  await app.listen(port);
}

bootstrap();
