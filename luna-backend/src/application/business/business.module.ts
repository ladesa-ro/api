import { Module } from '@nestjs/common';
import { AmbientesModule } from './ambientes/ambientes.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';

@Module({
  imports: [AutenticacaoModule, AmbientesModule],
})
export class BusinessModule {}
