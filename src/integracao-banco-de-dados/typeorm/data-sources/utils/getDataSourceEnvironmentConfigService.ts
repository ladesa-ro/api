import { NestFactory } from '@nestjs/core';
import { AppConfigService } from '../../../../config';
import { DataSourceSetupModule } from './DataSourceSetupModule';

export const getDataSourceAppConfigService = async (appConfigService: AppConfigService | null) => {
  if (appConfigService === null) {
    const app = await NestFactory.create(DataSourceSetupModule);

    const appConfigService = app.get(AppConfigService);

    return appConfigService;
  }

  return appConfigService;
};
