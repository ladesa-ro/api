import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AdapterGraphQLModule } from './adapter-graphql/adapter-graphql.module';
import { GqlExceptionFilter } from './adapter-graphql/exception-filters/GqlExceptionFilter';

@Module({
  imports: [
    //
    AdapterGraphQLModule,
  ],

  providers: [
    {
      provide: APP_FILTER,
      useClass: GqlExceptionFilter,
    },
  ],
})
export class AdaptersModule {}
