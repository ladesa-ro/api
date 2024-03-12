
import { Module } from '@nestjs/common';
import { ModalidadeModule } from './modalidade/modalidade.module';
import { CursoModule } from './curso/curso.module';

@Module({
  imports: [ModalidadeModule, CursoModule],
})
export class EnsinoModule { }