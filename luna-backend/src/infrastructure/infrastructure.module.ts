import { Module } from '@nestjs/common';
import { AdaptersModule } from '../infrastructure/adapters';
import { AuthenticationModule } from '../infrastructure/authentication';
import { EnvironmentConfigModule } from '../infrastructure/environment-config';
import { IntegrateDatabaseModule } from '../infrastructure/integrate-database';

@Module({
  imports: [AdaptersModule, AuthenticationModule, EnvironmentConfigModule, IntegrateDatabaseModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
