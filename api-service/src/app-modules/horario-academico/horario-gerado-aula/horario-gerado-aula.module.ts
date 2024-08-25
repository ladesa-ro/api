import { Module } from '@nestjs/common';
import { IntervaloDeTempoModule } from '@/app-modules/calendario/intervalo-de-tempo/intervalo-de-tempo.module';
import { HorarioGeradoAulaService } from './horario-gerado-aula.service';
import { HorarioGeradoAulaResolver } from './horario-gerado-aula.resolver';
import { HorarioGeradoAulaController } from './horario-gerado-aula.controller';
import { DiarioProfessorModule } from '@/app-modules/calendario/diario-professor/diario-professor.module';
import { HorarioGeradoModule } from '../horario-gerado/horario-gerado.module';


@Module({
  imports: [IntervaloDeTempoModule, DiarioProfessorModule, HorarioGeradoModule],
  providers: [HorarioGeradoAulaService, HorarioGeradoAulaResolver],
  controllers: [HorarioGeradoAulaController],
  exports: [HorarioGeradoAulaService],
})
export class HorarioGeradoAulaModule {}
