import { Module } from '@nestjs/common';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoResolver } from './autenticacao.resolver';
import { AutenticacaoService } from './autenticacao.service';
import { UsuarioVinculoCampusModule } from './usuario-vinculo-campus/usuario-vinculo-campus.module';
import { UsuarioModule } from './usuario/usuario.module';
import { OpenidConnectModule, KeycloakModule } from '../../integracao-identidade-e-acesso';

@Module({
  imports: [UsuarioModule, UsuarioVinculoCampusModule, OpenidConnectModule, KeycloakModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, AutenticacaoResolver],
  exports: [],
})
export class AutenticacaoModule {}
