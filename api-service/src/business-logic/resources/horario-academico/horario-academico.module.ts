import { Module } from "@nestjs/common";
import { DiarioPreferenciaAgrupamentoModule } from "./diario-preferencia-agrupamento/diario-preferencia-agrupamento.module";
import { DisponibilidadeProfessorDiaModule } from "./disponibilidade-professor-dia/disponibilidade-professor-dia.module";
import { DisponibilidadeProfessorModule } from "./disponibilidade-professor/disponibilidade-professor.module";
import { HorarioGeradoAulaModule } from "./horario-gerado-aula/horario-gerado-aula.module";
import { HorarioGeradoModule } from "./horario-gerado/horario-gerado.module";
import { TurmaDisponibilidadeDiaModule } from "./turma-disponibilidade-dia/turma-disponibilidade-dia.module";
import { TurmaDisponibilidadeModule } from "./turma-disponibilidade/turma-disponibilidade.module";

@Module({
  imports: [
    TurmaDisponibilidadeModule,
    TurmaDisponibilidadeDiaModule,
    DisponibilidadeProfessorModule,
    DisponibilidadeProfessorDiaModule,
    DiarioPreferenciaAgrupamentoModule,
    HorarioGeradoModule,
    HorarioGeradoAulaModule,
  ],
})
export class HorarioAcademicoModule {}
