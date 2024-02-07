import { appDataSourceProvider } from './providers/app-data-source.provider';
import { appDatabaseContextProvider } from './providers/app-database-context.provider';

export const typeormProviders = [
  // ...
  appDataSourceProvider,
  appDatabaseContextProvider,
];
