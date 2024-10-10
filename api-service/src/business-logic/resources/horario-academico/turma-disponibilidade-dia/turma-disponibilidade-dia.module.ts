import { IntervaloDeTempoModule } from "@/business-logic/resources/calendario/intervalo-de-tempo/intervalo-de-tempo.module";
import { Module } from "@nestjs/common";
import { TurmaDisponibilidadeModule } from "../turma-disponibilidade/turma-disponibilidade.module";
import { TurmaDisponibilidadeDiaController } from "./turma-disponibilidade-dia.controller";
import { TurmaDisponibilidadeDiaResolver } from "./turma-disponibilidade-dia.resolver";
import { TurmaDisponibilidadeDiaService } from "./turma-disponibilidade-dia.service";

@Module({
  imports: [IntervaloDeTempoModule, TurmaDisponibilidadeModule],
  providers: [TurmaDisponibilidadeDiaService, TurmaDisponibilidadeDiaResolver],
  controllers: [TurmaDisponibilidadeDiaController],
  exports: [TurmaDisponibilidadeDiaService],
})
export class TurmaDisponibilidadeDiaModule {}
