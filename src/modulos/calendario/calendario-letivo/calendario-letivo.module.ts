import { Module } from '@nestjs/common';
import { CampusModule } from '@/nest-app/business/ambientes/campus/campus.module';
import { ModalidadeModule } from '@/nest-app/business/ensino/modalidade/modalidade.module';
import { CalendarioLetivoController } from './calendario-letivo.controller';
import { CalendarioLetivoResolver } from './calendario-letivo.resolver';
import { CalendarioLetivoService } from './calendario-letivo.service';

@Module({
  imports: [CampusModule, ModalidadeModule],
  providers: [CalendarioLetivoService, CalendarioLetivoResolver],
  controllers: [CalendarioLetivoController],
})
export class CalendarioLetivoModule {}
