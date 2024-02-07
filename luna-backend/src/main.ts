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

  const config = new DocumentBuilder()
    .setTitle('SISGEA - Luna - API')
    .setDescription(
      'API para a consulta e manipulação de dados e procedimentos relacionados ao Sistema de Gestão Acadêmico.',
    )
    .setVersion('0.0')
    .addServer('https://luna.sisgha.com:1337/api/')
    .addServer('http://localhost:3000/')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc-api', app, document);

  //

  const port = environmentConfigService.getRuntimePort();

  await app.listen(port);
}

bootstrap();
