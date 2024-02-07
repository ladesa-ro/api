import { Module } from '@nestjs/common';
import { AdapterGraphQLModule } from '../infrastructure/adapter-graphql/adapter-graphql.module';
import { EnvironmentConfigModule } from '../infrastructure/environment-config';
import { IntegrateDatabaseModule } from '../infrastructure/integrate-database/integrate-database.module';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';

@Module({
  imports: [
    //
    EnvironmentConfigModule,
    //
    IntegrateDatabaseModule,
    //
    AdapterGraphQLModule,
    //
    BaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
