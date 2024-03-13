import { Module } from '@nestjs/common';
import { CursoModule } from './curso/curso.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { ModalidadeModule } from './modalidade/modalidade.module';

@Module({
  imports: [ModalidadeModule, CursoModule, DisciplinaModule],
})
export class EnsinoModule {}
