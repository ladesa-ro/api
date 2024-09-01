import { Module } from '@nestjs/common';
import { IntervaloDeTempoModule } from '@/app-modules/calendario/intervalo-de-tempo/intervalo-de-tempo.module';
import { DiarioPreferenciaAgrupamentoService } from './diario-preferencia-agrupamento.service';
import { DiarioPreferenciaAgrupamentoResolver } from './diario-preferencia-agrupamento.resolver';
import { DiarioPreferenciaAgrupamentoController } from './diario-preferencia-agrupamento.controller';
import { DiarioModule } from '@/app-modules/calendario/diario/diario.module';


@Module({
  imports: [IntervaloDeTempoModule, DiarioModule],
  providers: [DiarioPreferenciaAgrupamentoService, DiarioPreferenciaAgrupamentoResolver],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
