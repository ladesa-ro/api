import { Module } from '@nestjs/common';
import { CalendarioLetivoController } from './calendario-letivo.controller';
import { CalendarioLetivoResolver } from './calendario-letivo.resolver';
import { CalendarioLetivoService } from './calendario-letivo.service';
import { CampusModule } from '../../ambientes/campus/campus.module';
import { ModalidadeModule } from '../../ensino/modalidade/modalidade.module';

@Module({
  imports: [CampusModule, ModalidadeModule],
  providers: [CalendarioLetivoService, CalendarioLetivoResolver],
  controllers: [CalendarioLetivoController],
})
export class CalendarioLetivoModule {}
