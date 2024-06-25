import { Module } from '@nestjs/common';
import { CalendarioLetivoModule } from './calendario-letivo/calendario-letivo.module';
import { DiaCalendarioModule } from './dia-calendario/dia-calendario.module';
import { DiarioProfessorModule } from './diario-professor/diario-professor.module';
import { DiarioModule } from './diario/diario.module';
import { EtapaModule } from './etapa/etapa.module';
import { EventoModule } from './evento/evento.module';

@Module({
  imports: [
    //
    CalendarioLetivoModule,
    EventoModule,
    DiaCalendarioModule,
    DiarioModule,
    DiarioProfessorModule,
    EtapaModule,
  ],
})
export class CalendarioModule {}