import { Module } from '@nestjs/common';
import { KeycloakModule, OpenidConnectModule } from '../../integracao-identidade-e-acesso';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoResolver } from './autenticacao.resolver';
import { AutenticacaoService } from './autenticacao.service';
import { VinculoModule } from './usuario-vinculo-campus/usuario-vinculo-campus.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule, VinculoModule, OpenidConnectModule, KeycloakModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, AutenticacaoResolver],
  exports: [],
})
export class AutenticacaoModule {}
