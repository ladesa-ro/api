import { NestFactory } from '@nestjs/core';
import { EnvironmentConfigService } from '../../../../config';
import { DataSourceSetupModule } from './DataSourceSetupModule';

export const getDataSourceEnvironmentConfigService = async (environmentConfigService: EnvironmentConfigService | null) => {
  if (environmentConfigService === null) {
    const app = await NestFactory.create(DataSourceSetupModule);

    const environmentConfigService = app.get(EnvironmentConfigService);

    return environmentConfigService;
  }

  return environmentConfigService;
};
