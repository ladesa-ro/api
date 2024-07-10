import { Module } from '@nestjs/common';
import { TurmaModule } from '@/app-modules/ensino/turma/turma.module';
import { TurmaDisponibilidadeDiaService } from './turma-disponibilidade-dia.service';
import { TurmaDisponibilidadeDiaResolver } from './turma-disponibilidade-dia.resolver';
import { TurmaDisponibilidadeDiaController } from './turma-disponibilidade-dia.controller';
import { TurmaDisponibilidadeModule } from '../turma-disponibilidade/turma-disponibilidade.module';
import { IntervaloDeTempoModule } from '@/app-modules/calendario/intervalo-de-tempo/intervalo-de-tempo.module';

@Module({
  imports: [IntervaloDeTempoModule, TurmaDisponibilidadeModule],
  providers: [TurmaDisponibilidadeDiaService, TurmaDisponibilidadeDiaResolver],
  controllers: [TurmaDisponibilidadeDiaController],
  exports: [TurmaDisponibilidadeDiaService],
})
export class TurmaDisponibilidadeDiaModule {}
