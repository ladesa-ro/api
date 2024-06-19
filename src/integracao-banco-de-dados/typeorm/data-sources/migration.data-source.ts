import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { EnvironmentConfigService } from '../../../config';
import { getDataSourceEnvironmentConfigService } from './utils/getDataSourceEnvironmentConfigService';

export const getMigrationDataSource = async (environmentConfigServiceBase: EnvironmentConfigService | null = null) => {
  const environmentConfigService = await getDataSourceEnvironmentConfigService(environmentConfigServiceBase);

  const options = environmentConfigService.getTypeOrmMigrationDataSourceOptions();

  const dataSource = new DataSource(options as DataSourceOptions);

  return dataSource;
};

const migrationDataSource = getMigrationDataSource();

export default migrationDataSource;
