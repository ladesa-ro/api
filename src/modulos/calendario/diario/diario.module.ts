import { Module } from '@nestjs/common';
import { AmbienteModule } from '../../ambientes/ambiente';
import { DisciplinaModule } from '../../ensino/disciplina/disciplina.module';
import { TurmaModule } from '../../ensino/turma/turma.module';
import { CalendarioLetivoModule } from '../calendario-letivo/calendario-letivo.module';
import { DiarioController } from './diario.controller';
import { DiarioResolver } from './diario.resolver';
import { DiarioService } from './diario.service';

@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioController],
  providers: [DiarioService, DiarioResolver],
  exports: [DiarioService],
})
export class DiarioModule {}
