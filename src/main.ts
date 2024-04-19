import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { AppModule } from './application/app.module';
import { IConfig } from './domain';
import { EnvironmentConfigService } from './infrastructure/environment-config';
import { getModuleHelmet } from './infrastructure/utils/modules/helmet/modules.helmet';

function setupSwaggerConfig(configService: IConfig | null = null) {
  const config = new DocumentBuilder();

  config.setTitle('SISGEA - Luna - API');
  config.setDescription('API para a consulta e manipulação de dados e procedimentos relacionados ao Sistema de Gestão Acadêmico.');
  config.setVersion('0.0');

  config.addBearerAuth();

  config.addTag('Base', 'SISGEA - Base');

  config.addTag('Arquivos', 'Armazenamento / Arquivos');

  config.addTag('Autenticacao');
  config.addTag('Usuarios', 'Autenticação / Usuários');

  config.addTag('Estados', 'Ambientes / Estados');
  config.addTag('Cidades', 'Ambientes / Cidades');
  config.addTag('Campi', 'Ambientes / Campi');
  config.addTag('Blocos', 'Ambientes / Campi / Blocos');
  config.addTag('Ambientes', 'Ambientes / Campi / Blocos / Ambiente');
  config.addTag('Reservas', 'Ambientes / Campi / Blocos / Ambiente / Reservas');

  config.addTag('Vinculos', 'Autenticação / Usuários / Vínculos');

  config.addTag('Modalidades', 'Ensino / Modalidade');
  config.addTag('Cursos', 'Ensino / Cursos');
  config.addTag('Disciplinas', 'Ensino / Disciplinas');
  config.addTag('Turmas', 'Ensino / Turmas');
  config.addTag('Diarios', 'Ensino / Diarios');
  config.addTag('DiarioProfessor', 'Ensino / Diário Professor');

  config.addTag('Calendarios Letivos', 'Calendario / Calendarios Letivos');

  const servers = configService?.getSwaggerServers();

  if (servers) {
    for (const server of servers) {
      config.addServer(server);
    }
  }

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

  const config = setupSwaggerConfig(environmentConfigService);

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
