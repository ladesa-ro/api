import { DiarioProfessorModule } from "@/business-logic/resources/calendario/diario-professor/diario-professor.module";
import { IntervaloDeTempoModule } from "@/business-logic/resources/calendario/intervalo-de-tempo/intervalo-de-tempo.module";
import { Module } from "@nestjs/common";
import { HorarioGeradoModule } from "../horario-gerado/horario-gerado.module";
import { HorarioGeradoAulaController } from "./horario-gerado-aula.controller";
import { HorarioGeradoAulaResolver } from "./horario-gerado-aula.resolver";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";

@Module({
  imports: [IntervaloDeTempoModule, DiarioProfessorModule, HorarioGeradoModule],
  providers: [HorarioGeradoAulaService, HorarioGeradoAulaResolver],
  controllers: [HorarioGeradoAulaController],
  exports: [HorarioGeradoAulaService],
})
export class HorarioGeradoAulaModule {}
