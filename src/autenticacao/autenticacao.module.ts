import { Module } from '@nestjs/common';
import { AutenticacaoPassportModule } from './passport';
import { UsuarioDaRequisicaoModule } from './usuario-da-requisicao';

@Module({
  imports: [UsuarioDaRequisicaoModule, AutenticacaoPassportModule],
})
export class AutenticacaoModule {}
