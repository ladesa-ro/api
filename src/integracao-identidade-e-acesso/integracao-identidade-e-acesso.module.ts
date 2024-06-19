import { Module } from '@nestjs/common';
import { IntegracaoIdentidadeEAcessoService } from './integracao-identidade-e-acesso.service';
import { JwksRsaClientModule } from './jwks-rsa-client';
import { KeycloakModule } from './keycloak';
import { OpenidConnectModule } from './openid-connect';

@Module({
  imports: [JwksRsaClientModule, OpenidConnectModule, KeycloakModule],
  providers: [IntegracaoIdentidadeEAcessoService],
  exports: [IntegracaoIdentidadeEAcessoService],
})
export class IntegracaoIdentidadeEAcessoModule {}
