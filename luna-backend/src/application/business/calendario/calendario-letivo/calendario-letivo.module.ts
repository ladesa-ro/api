import { Module } from '@nestjs/common';
import { CampusModule } from 'application/business/ambientes/campus/campus.module';
import { ModalidadeModule } from 'application/business/ensino/modalidade/modalidade.module';
import { CalendarioLetivoController } from './calendario-letivo.controller';
import { CalendarioLetivoResolver } from './calendario-letivo.resolver';
import { CalendarioLetivoService } from './calendario-letivo.service';

@Module({
  imports: [CampusModule, ModalidadeModule],
  providers: [CalendarioLetivoService, CalendarioLetivoResolver],
  controllers: [CalendarioLetivoController],
})
export class CalendarioLetivoModule {}
