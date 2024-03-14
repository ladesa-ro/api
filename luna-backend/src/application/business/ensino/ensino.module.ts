import { DiarioModule } from './diario/diario.module';
import { TurmaModule } from './turma/turma.module';
import { Module } from '@nestjs/common';
import { CursoModule } from './curso/curso.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { ModalidadeModule } from './modalidade/modalidade.module';

@Module({
  imports: [ModalidadeModule, CursoModule, DisciplinaModule, TurmaModule, DiarioModule],
})
export class EnsinoModule {}
