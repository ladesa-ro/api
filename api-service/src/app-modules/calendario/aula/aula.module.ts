import { Module } from '@nestjs/common';
import { AmbienteModule } from '../../ambientes/ambiente';
import { AulaController } from './aula.controller';
import { AulaService } from './aula.service';
import { AulaResolver } from './aula.resolver';
import { IntervaloDeTempoModule } from '../intervalo-de-tempo/intervalo-de-tempo.module';
import { DiarioModule } from '../diario/diario.module';

@Module({
  imports: [IntervaloDeTempoModule, DiarioModule, AmbienteModule],
  controllers: [AulaController],
  providers: [AulaService, AulaResolver],
  exports: [AulaService],
})
export class AulaModule {}
