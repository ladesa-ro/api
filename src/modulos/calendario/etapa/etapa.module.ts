import { Module } from '@nestjs/common';
import { CalendarioLetivoModule } from '../calendario-letivo/calendario-letivo.module';
import { EtapaService } from './etapa.service';
import { EtapaResolver } from './etapa.resolver';
import { EtapaController } from './etapa.controller';

@Module({
  imports: [CalendarioLetivoModule],
  providers: [EtapaService, EtapaResolver],
  controllers: [EtapaController],
})
export class EtapaModule {}
