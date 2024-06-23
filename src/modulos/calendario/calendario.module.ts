import { Module } from '@nestjs/common';
import { CalendarioLetivoModule } from './calendario-letivo/calendario-letivo.module';
import { EventoModule } from './evento/evento.module';
import { DiaCalendarioModule } from './dia-calendario/dia-calendario.module';

@Module({
  imports: [CalendarioLetivoModule, EventoModule, DiaCalendarioModule],
})
export class CalendarioModule {}
