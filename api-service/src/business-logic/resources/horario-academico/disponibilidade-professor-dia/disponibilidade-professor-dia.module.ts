import { IntervaloDeTempoModule } from "@/business-logic/resources/calendario/intervalo-de-tempo/intervalo-de-tempo.module";
import { Module } from "@nestjs/common";
import { DisponibilidadeProfessorModule } from "../disponibilidade-professor/disponibilidade-professor.module";
import { DisponibilidadeProfessorDiaController } from "./disponibilidade-professor-dia.controller";
import { DisponibilidadeProfessorDiaResolver } from "./disponibilidade-professor-dia.resolver";
import { DisponibilidadeProfessorDiaService } from "./disponibilidade-professor-dia.service";

@Module({
  imports: [DisponibilidadeProfessorModule, IntervaloDeTempoModule],
  providers: [DisponibilidadeProfessorDiaService, DisponibilidadeProfessorDiaResolver],
  controllers: [DisponibilidadeProfessorDiaController],
  exports: [DisponibilidadeProfessorDiaService],
})
export class DisponibilidadeProfessorDiaModule {}
