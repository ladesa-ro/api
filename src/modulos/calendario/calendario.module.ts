import { Module } from '@nestjs/common';
import { CalendarioLetivoModule } from './calendario-letivo/calendario-letivo.module';
import { EventoModule } from './evento/evento.module';

@Module({
  imports: [CalendarioLetivoModule, EventoModule],
})
export class CalendarioModule {}
