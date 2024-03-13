import { Module } from '@nestjs/common';
import { CursoModule } from './curso/curso.module';
import { ModalidadeModule } from './modalidade/modalidade.module';

@Module({
  imports: [ModalidadeModule, CursoModule],
})
export class EnsinoModule {}
