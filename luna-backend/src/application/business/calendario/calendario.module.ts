import { Module } from '@nestjs/common';
import { CalendarioLetivoModule } from './calendario-letivo/calendario-letivo.module';

@Module({
  imports: [
    CalendarioLetivoModule
  ],
})
export class CalendarioModule {}