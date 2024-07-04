import { Module } from '@nestjs/common';
import { IntervaloDeTempoService } from './intervalo-de-tempo.service';

@Module({
  imports: [],
  providers: [IntervaloDeTempoService],
  exports: [IntervaloDeTempoService],
  controllers: [],
})
export class IntervaloDeTempoModule {}
