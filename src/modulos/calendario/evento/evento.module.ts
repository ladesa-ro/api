import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoResolver } from './evento.resolver';
import { EventoController } from './evento.controller';
import { CalendarioLetivoModule } from '../calendario-letivo/calendario-letivo.module';

@Module({
  imports: [CalendarioLetivoModule],
  providers: [EventoService, EventoResolver],
  controllers: [EventoController],
})
export class EventoModule {}
