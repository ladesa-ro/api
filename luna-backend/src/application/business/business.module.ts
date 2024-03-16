import { Module } from '@nestjs/common';
import { AmbientesModule } from './ambientes/ambientes.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { EnsinoModule } from './ensino/ensino.module';
import { CalendarioModule } from './calendario/calendario.module';

@Module({
  imports: [AutenticacaoModule, AmbientesModule, EnsinoModule, CalendarioModule],
})
export class BusinessModule {}
