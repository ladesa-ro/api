import { Module } from '@nestjs/common';
import { AdapterGraphQLModule } from './adapter-graphql';
import { AdapterHttpModule } from './adapter-http';
import { APP_FILTER } from '@nestjs/core';
import { GqlExceptionFilter } from './adapter-graphql/exception-filters/GqlExceptionFilter';

@Module({
  imports: [AdapterHttpModule, AdapterGraphQLModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GqlExceptionFilter,
    },
  ],
})
export class AdaptersModule {}
