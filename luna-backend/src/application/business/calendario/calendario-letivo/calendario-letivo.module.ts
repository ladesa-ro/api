import { Module } from '@nestjs/common';
import { CampusModule } from 'application/business/ambientes/campus/campus.module';
import { ModalidadeModule } from 'application/business/ensino/modalidade/modalidade.module';
import { CalendarioLetivoController } from './calendario-letivo.controller';
import { CalendarioLetivoService } from './calendario-letivo.service';

@Module({
  imports: [CampusModule, ModalidadeModule],
  providers: [CalendarioLetivoService],
  controllers: [CalendarioLetivoController],
})
export class CalendarioLetivoModule {}
