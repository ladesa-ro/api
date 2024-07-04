import { Module } from '@nestjs/common';
import { TurmaModule } from '@/app-modules/ensino/turma/turma.module';
import { TurmaDisponibilidadeService } from './turma-disponibilidade.service';
import { TurmaDisponibilidadeResolver } from './turma-disponibilidade.resolver';
import { TurmaDisponibilidadeController } from './turma-disponibilidade.controller';

@Module({
  imports: [TurmaModule],
  providers: [TurmaDisponibilidadeService, TurmaDisponibilidadeResolver],
  controllers: [TurmaDisponibilidadeController],
  exports: [TurmaDisponibilidadeService],
})
export class TurmaDisponibilidadeModule {}
