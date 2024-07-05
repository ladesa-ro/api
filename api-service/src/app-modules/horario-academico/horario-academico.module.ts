import { Module } from '@nestjs/common';
import { TurmaDisponibilidadeModule } from './turma-disponibilidade/turma-disponibilidade.module';


@Module({
  imports: [TurmaDisponibilidadeModule],
})
export class HorarioAcademicoModule {}
