import { Module } from '@nestjs/common';
import { TurmaDisponibilidadeModule } from './turma-disponibilidade/turma-disponibilidade.module';
import { TurmaDisponibilidadeDiaModule } from './turma-disponibilidade-dia/turma-disponibilidade-dia.module';
import { DisponibilidadeProfessorModule } from './disponibilidade-professor/disponibilidade-professor.module';
import { DisponibilidadeProfessorDiaModule } from './disponibilidade-professor-dia/disponibilidade-professor-dia.module';
import { DiarioPreferenciaAgrupamentoModule } from './diario-preferencia-agrupamento/diario-preferencia-agrupamento.module';
import { HorarioGeradoModule } from './horario-gerado/horario-gerado.module';


@Module({
  imports: [
    TurmaDisponibilidadeModule, 
    TurmaDisponibilidadeDiaModule,
    DisponibilidadeProfessorModule,
    DisponibilidadeProfessorDiaModule,
    DiarioPreferenciaAgrupamentoModule,
    HorarioGeradoModule
  ],
})
export class HorarioAcademicoModule {}
