import { Module } from '@nestjs/common';
import { IdpConnectTceService } from './idp-external-connect.service';
import { JwksRsaClientModule } from './jwks-rsa-client';
import { KeycloakModule } from './keycloak';
import { OpenidConnectModule } from './openid-connect';

@Module({
  imports: [JwksRsaClientModule, OpenidConnectModule, KeycloakModule],
  providers: [IdpConnectTceService],
  exports: [IdpConnectTceService],
})
export class IdpExternalConnectModule {}
