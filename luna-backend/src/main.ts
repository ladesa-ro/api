import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { AppModule } from './application/root/app.module';
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

  const port = environmentConfigService.getRuntimePort();

  await app.listen(port);
}

bootstrap();
