import { Module } from '@nestjs/common';
import { OpenidConnectModule } from './../../../infrastructure/authentication/idp-external-connect/openid-connect/openid-connect.module';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoResolver } from './autenticacao.resolver';
import { AutenticacaoService } from './autenticacao.service';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule, OpenidConnectModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, AutenticacaoResolver],
  exports: [],
})
export class AutenticacaoModule {}
