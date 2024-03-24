import { Module } from '@nestjs/common';
import { AmbientesModule } from './ambientes/ambientes.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { BaseModule } from './base/base.module';
import { CalendarioModule } from './calendario/calendario.module';
import { EnsinoModule } from './ensino/ensino.module';

@Module({
  imports: [
    //
    BaseModule,
    AutenticacaoModule,
    AmbientesModule,
    EnsinoModule,
    CalendarioModule,
  ],
})
export class BusinessModule {}
