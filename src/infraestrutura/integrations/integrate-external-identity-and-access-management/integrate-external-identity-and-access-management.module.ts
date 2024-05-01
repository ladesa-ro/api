import { Module } from '@nestjs/common';
import { IntegrateExternalIdentityAndAccessManagementService } from './integrate-external-identity-and-access-management.service';
import { JwksRsaClientModule } from './jwks-rsa-client';
import { KeycloakModule } from './keycloak';
import { OpenidConnectModule } from './openid-connect';

@Module({
  imports: [JwksRsaClientModule, OpenidConnectModule, KeycloakModule],
  providers: [IntegrateExternalIdentityAndAccessManagementService],
  exports: [IntegrateExternalIdentityAndAccessManagementService],
})
export class IntegrateExternalIdentityAndAccessManagementModule {}
