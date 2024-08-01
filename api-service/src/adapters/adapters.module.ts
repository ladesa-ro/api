import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AdapterDatabaseModule } from './adapter-database/adapter-database.module';
import { AdapterGraphQLModule } from './adapter-graphql';
import { GqlExceptionFilter } from './adapter-graphql/exception-filters/GqlExceptionFilter';
import { AdapterHttpModule } from './adapter-http';
import { MessageBrokerModule } from './adapter-message-broker/message-broker.module';

@Module({
  imports: [AdapterHttpModule, AdapterGraphQLModule, AdapterDatabaseModule, AdapterGraphQLModule, MessageBrokerModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GqlExceptionFilter,
    },
  ],
})
export class AdaptersModule { }
