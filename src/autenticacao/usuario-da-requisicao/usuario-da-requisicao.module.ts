import { Module } from '@nestjs/common';
import { IntegrateExternalIdentityAndAccessManagementModule } from '../../infraestrutura';
import { AutenticacaoPassportModule } from '../passport/passport.module';
import { UsuarioDaRequisicaoService } from './usuario-da-requisicao.service';

@Module({
  imports: [IntegrateExternalIdentityAndAccessManagementModule, AutenticacaoPassportModule],
  providers: [UsuarioDaRequisicaoService],
  exports: [UsuarioDaRequisicaoService],
})
export class UsuarioDaRequisicaoModule {}
