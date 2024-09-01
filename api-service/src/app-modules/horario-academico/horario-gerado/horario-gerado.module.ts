import { Module } from '@nestjs/common';
import { CalendarioLetivoModule } from '@/app-modules/calendario/calendario-letivo/calendario-letivo.module';
import { HorarioGeradoService } from './horario-gerado.service';
import { HorarioGeradoResolver } from './horario-gerado.resolver';
import { HorarioGeradoController } from './horario-gerado.controller';

@Module({
  imports: [CalendarioLetivoModule],
  providers: [HorarioGeradoService, HorarioGeradoResolver],
  controllers: [HorarioGeradoController],
  exports: [HorarioGeradoService],

})
export class HorarioGeradoModule {}
