import { Module } from '@nestjs/common';
import { AmbienteModule } from '../../ambientes/ambiente/ambiente.module';
import { CursoModule } from '../curso/curso.module';
import { TurmaController } from './turma.controller';
import { TurmaResolver } from './turma.resolver';
import { TurmaService } from './turma.service';

@Module({
  imports: [AmbienteModule, CursoModule],
  controllers: [TurmaController],
  providers: [TurmaService, TurmaResolver],
  exports: [TurmaService],
})
export class TurmaModule {}
