import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AdapterDatabaseModule } from './adapter-database/adapter-database.module';
import { AdapterGraphQLModule } from './adapter-graphql';
import { GqlExceptionFilter } from './adapter-graphql/exception-filters/GqlExceptionFilter';
import { AdapterHttpModule } from './adapter-http';

@Module({
  imports: [AdapterHttpModule, AdapterGraphQLModule, AdapterDatabaseModule, AdapterGraphQLModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GqlExceptionFilter,
    },
  ],
})
export class AdaptersModule {}
