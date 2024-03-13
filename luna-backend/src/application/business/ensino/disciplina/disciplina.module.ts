import { DisciplinaResolver } from './disciplina.resolver';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [DisciplinaController],
  providers: [DisciplinaService, DisciplinaResolver],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
