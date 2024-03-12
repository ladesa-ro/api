import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { AppModule } from './application/app.module';
import { EnvironmentConfigService } from './infrastructure/environment-config';
import { getModuleHelmet } from './infrastructure/utils/modules/helmet/modules.helmet';

function setupSwaggerConfig() {
  const config = new DocumentBuilder();

  config.setTitle('SISGEA - Luna - API');
  config.setDescription('API para a consulta e manipulação de dados e procedimentos relacionados ao Sistema de Gestão Acadêmico.');
  config.setVersion('0.0');

  config.addBearerAuth();

  config.addTag('API', 'SISGEA - API');
  config.addTag('Autenticacao');
  config.addTag('Usuarios', 'Autenticação / Usuários');
  config.addTag('Vinculos', 'Autenticação / Usuários / Vínculos');
  config.addTag('Estados', 'Ambientes / Estados');
  config.addTag('Cidades', 'Ambientes / Cidades');
  config.addTag('Campi', 'Ambientes / Campi');
  config.addTag('Blocos', 'Ambientes / Campi / Blocos');
  config.addTag('Ambientes', 'Ambientes / Campi / Blocos / Ambiente');
  config.addTag('Modalidades', 'Ensnino / Modalidade');

  config.addServer("https://luna.sisgha.com/api/")
  config.addServer("http://localhost:3000/")

  return config;
}

async function bootstrap() {
  //

  const app = await NestFactory.create(AppModule);

  const environmentConfigService = app.get(EnvironmentConfigService);

  //

  const isProduction = environmentConfigService.getRuntimeIsProduction();

  const port = environmentConfigService.getRuntimePort();
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

  const config = setupSwaggerConfig();

  const document = SwaggerModule.createDocument(app, config.build());

  SwaggerModule.setup('doc-api', app, document, {
    swaggerOptions: {
      // tagsSorter: 'alpha',
      // operationsSorter: 'alpha',
    },
  });

  app.enableCors();

  await app.listen(port);
}

bootstrap();
