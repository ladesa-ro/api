import { Module } from '@nestjs/common';
import { CalendarioLetivoModule } from '../calendario-letivo/calendario-letivo.module';
import { DiaCalendarioService } from './dia-calendario.service';
import { DiaCalendarioResolver } from './dia-calendario.resolver';
import { DiaCalendarioController } from './dia-calendario.controller';

@Module({
  imports: [CalendarioLetivoModule],
  providers: [DiaCalendarioService, DiaCalendarioResolver],
  controllers: [DiaCalendarioController],
})
export class DiaCalendarioModule {}
