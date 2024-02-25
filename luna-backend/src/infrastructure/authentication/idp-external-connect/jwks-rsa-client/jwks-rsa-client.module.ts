import { Module } from '@nestjs/common';

import { JwksRsaClientService } from './jwks-rsa-client.service';

@Module({
  imports: [],
  providers: [JwksRsaClientService],
  exports: [JwksRsaClientService],
})
export class JwksRsaClientModule {}
