import { Module } from '@nestjs/common';
import { CampusModule } from '../../ambientes/campus/campus.module';
import { ModalidadeModule } from '../../ensino/modalidade/modalidade.module';
import { CalendarioLetivoController } from './calendario-letivo.controller';
import { CalendarioLetivoResolver } from './calendario-letivo.resolver';
import { CalendarioLetivoService } from './calendario-letivo.service';

@Module({
  imports: [CampusModule, ModalidadeModule],
  providers: [CalendarioLetivoService, CalendarioLetivoResolver],
  exports: [CalendarioLetivoService],
  controllers: [CalendarioLetivoController],
})
export class CalendarioLetivoModule {}
