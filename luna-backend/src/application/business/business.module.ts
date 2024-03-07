import { Module } from '@nestjs/common';
import { AmbientesModule } from './ambientes/ambientes.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { EnsinoModule } from './ensino/ensino.module';

@Module({
  imports: [AutenticacaoModule, AmbientesModule, EnsinoModule],
})
export class BusinessModule { }
