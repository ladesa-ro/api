import { TurmaModule } from "@/business-logic/resources/ensino/turma/turma.module";
import { Module } from "@nestjs/common";
import { TurmaDisponibilidadeController } from "./turma-disponibilidade.controller";
import { TurmaDisponibilidadeResolver } from "./turma-disponibilidade.resolver";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";

@Module({
  imports: [TurmaModule],
  providers: [TurmaDisponibilidadeService, TurmaDisponibilidadeResolver],
  controllers: [TurmaDisponibilidadeController],
  exports: [TurmaDisponibilidadeService],
})
export class TurmaDisponibilidadeModule {}
