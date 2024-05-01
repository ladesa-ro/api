import { DataSource, DataSourceOptions } from 'typeorm';
import { getDataSourceEnvironmentConfigService } from './utils/getDataSourceEnvironmentConfigService';
import { EnvironmentConfigService } from '../../../config';

export const getMigrationDataSource = async (environmentConfigServiceBase: EnvironmentConfigService | null = null) => {
  const environmentConfigService = await getDataSourceEnvironmentConfigService(environmentConfigServiceBase);

  const options = environmentConfigService.getTypeOrmMigrationDataSourceOptions();

  const dataSource = new DataSource(options as DataSourceOptions);

  return dataSource;
};

const migrationDataSource = getMigrationDataSource();

export default migrationDataSource;
