import { Module } from '@nestjs/common';
import { IdentityAndAccessService } from './identity-and-access.service';
import { JwksRsaClientModule } from './jwks-rsa-client';
import { KeycloakModule } from './keycloak';
import { OpenidConnectModule } from './openid-connect';

@Module({
  imports: [JwksRsaClientModule, OpenidConnectModule, KeycloakModule],
  providers: [IdentityAndAccessService],
  exports: [IdentityAndAccessService],
})
export class AdapterIdentityAndAccessModule {}
