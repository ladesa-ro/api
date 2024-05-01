import { NestFactory } from '@nestjs/core';
import { DataSourceSetupModule } from './DataSourceSetupModule';
import { EnvironmentConfigService } from '../../../../config';

export const getDataSourceEnvironmentConfigService = async (environmentConfigService: EnvironmentConfigService | null) => {
  if (environmentConfigService === null) {
    const app = await NestFactory.create(DataSourceSetupModule);

    const environmentConfigService = app.get(EnvironmentConfigService);

    return environmentConfigService;
  }

  return environmentConfigService;
};
