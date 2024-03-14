import { ReservaResolver } from './reserva.resolver';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ReservaController],
  providers: [ReservaService, ReservaResolver],
  exports: [ReservaService],
})
export class ReservaModule {}
