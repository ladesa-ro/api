import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters';
import { AuthenticationModule } from './authentication';
import { EnvironmentConfigModule } from './environment-config';
import { IntegrateDatabaseModule } from './integrate-database';

@Module({
  imports: [AuthenticationModule, AdaptersModule, EnvironmentConfigModule, IntegrateDatabaseModule],
  controllers: [],
  exports: [],
  providers: [],
})
export class InfrastructureModule {}
