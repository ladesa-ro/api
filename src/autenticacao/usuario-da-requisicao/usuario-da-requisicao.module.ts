import { Module } from '@nestjs/common';
import { IntegracaoIdentidadeEAcessoModule } from '../../integracao-identidade-e-acesso';
import { UsuarioDaRequisicaoService } from './usuario-da-requisicao.service';

@Module({
  imports: [IntegracaoIdentidadeEAcessoModule],
  providers: [UsuarioDaRequisicaoService],
  exports: [UsuarioDaRequisicaoService],
})
export class UsuarioDaRequisicaoModule {}
