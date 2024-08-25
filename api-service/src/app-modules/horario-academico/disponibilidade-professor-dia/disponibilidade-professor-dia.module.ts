import { Module } from '@nestjs/common';
import { DisponibilidadeProfessorDiaService } from './disponibilidade-professor-dia.service';
import { DisponibilidadeProfessorDiaResolver } from './disponibilidade-professor-dia.resolver';
import { DisponibilidadeProfessorDiaController } from './disponibilidade-professor-dia.controller';
import { DisponibilidadeProfessorModule } from '../disponibilidade-professor/disponibilidade-professor.module';
import { IntervaloDeTempoModule } from '@/app-modules/calendario/intervalo-de-tempo/intervalo-de-tempo.module';


@Module({
  imports: [DisponibilidadeProfessorModule, IntervaloDeTempoModule],
  providers: [DisponibilidadeProfessorDiaService, DisponibilidadeProfessorDiaResolver],
  controllers: [DisponibilidadeProfessorDiaController],
  exports: [DisponibilidadeProfessorDiaService],
})
export class DisponibilidadeProfessorDiaModule {}
