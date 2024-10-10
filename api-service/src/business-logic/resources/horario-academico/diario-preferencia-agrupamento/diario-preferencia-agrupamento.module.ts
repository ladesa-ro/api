import { DiarioModule } from "@/business-logic/resources/calendario/diario/diario.module";
import { IntervaloDeTempoModule } from "@/business-logic/resources/calendario/intervalo-de-tempo/intervalo-de-tempo.module";
import { Module } from "@nestjs/common";
import { DiarioPreferenciaAgrupamentoController } from "./diario-preferencia-agrupamento.controller";
import { DiarioPreferenciaAgrupamentoResolver } from "./diario-preferencia-agrupamento.resolver";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";

@Module({
  imports: [IntervaloDeTempoModule, DiarioModule],
  providers: [DiarioPreferenciaAgrupamentoService, DiarioPreferenciaAgrupamentoResolver],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
