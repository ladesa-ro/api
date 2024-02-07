import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseContext } from '../database-context/database-context';
import { APP_DATA_SOURCE_TOKEN } from './app-data-source.provider';

export const appDatabaseContextProvider: Provider = {
  provide: DatabaseContext,

  useFactory: async (ds: DataSource) => {
    return DatabaseContext.new(ds);
  },

  inject: [APP_DATA_SOURCE_TOKEN],
};
