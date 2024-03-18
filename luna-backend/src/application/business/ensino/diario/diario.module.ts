import { Module } from '@nestjs/common';
import { AmbienteModule } from '../../ambientes/ambiente/ambiente.module';
import { DisciplinaModule } from '../disciplina/disciplina.module';
import { TurmaModule } from '../turma/turma.module';
import { DiarioController } from './diario.controller';
import { DiarioResolver } from './diario.resolver';
import { DiarioService } from './diario.service';

@Module({
  imports: [TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioController],
  providers: [DiarioService, DiarioResolver],
  exports: [DiarioService],
})
export class DiarioModule {}
