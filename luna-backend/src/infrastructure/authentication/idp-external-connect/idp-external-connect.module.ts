import { Module } from '@nestjs/common';
import { IdpConnectTceService } from './idp-external-connect.service';
import { JwksRsaClientModule } from './jwks-rsa-client';
import { OpenidConnectModule } from './openid-connect';

@Module({
  imports: [JwksRsaClientModule, OpenidConnectModule],
  providers: [IdpConnectTceService],
  exports: [IdpConnectTceService],
})
export class IdpExternalConnectModule {}
