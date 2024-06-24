import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppConfigService } from '../../../config';
import { getDataSourceAppConfigService } from './utils/getDataSourceEnvironmentConfigService';

export const getMigrationDataSource = async (appConfigServiceBase: AppConfigService | null = null) => {
  const appConfigService = await getDataSourceAppConfigService(appConfigServiceBase);

  const options = appConfigService.getTypeOrmMigrationDataSourceOptions();

  const dataSource = new DataSource(options as DataSourceOptions);

  return dataSource;
};

const migrationDataSource = getMigrationDataSource();

export default migrationDataSource;
