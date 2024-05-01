import { Module } from '@nestjs/common';
import { IntegrateDatabaseModule } from './integrate-database';
import { IntegrateExternalIdentityAndAccessManagementModule } from './integrate-external-identity-and-access-management';

@Module({
  imports: [IntegrateDatabaseModule, IntegrateExternalIdentityAndAccessManagementModule],
})
export class IntegrationsModule {}
