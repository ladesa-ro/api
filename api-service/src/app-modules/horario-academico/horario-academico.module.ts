import { Module } from '@nestjs/common';
import { TurmaDisponibilidadeModule } from './turma-disponibilidade/turma-disponibilidade.module';
import { TurmaDisponibilidadeDiaModule } from './turma-disponibilidade-dia/turma-disponibilidade-dia.module';


@Module({
  imports: [TurmaDisponibilidadeModule, TurmaDisponibilidadeDiaModule],
})
export class HorarioAcademicoModule {}
