import { Module } from "@nestjs/common";
import { DiarioPreferenciaAgrupamentoModule } from "./diario-preferencia-agrupamento/diario-preferencia-agrupamento.module";
import { HorarioGeradoAulaModule } from "./horario-gerado-aula/horario-gerado-aula.module";
import { HorarioGeradoModule } from "./horario-gerado/horario-gerado.module";

@Module({
  imports: [DiarioPreferenciaAgrupamentoModule, HorarioGeradoModule, HorarioGeradoAulaModule],
})
export class HorarioAcademicoModule {}
