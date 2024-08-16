import { Module } from '@nestjs/common';
import { UsuarioModule } from '../../autenticacao/usuario/usuario.module';
import { IntervaloDeTempoModule } from '../../calendario/intervalo-de-tempo/intervalo-de-tempo.module';
import { AmbienteModule } from '../ambiente/ambiente.module';
import { ReservaController } from './reserva.controller';
import { ReservaResolver } from './reserva.resolver';
import { ReservaService } from './reserva.service';

@Module({
  imports: [IntervaloDeTempoModule ,UsuarioModule, AmbienteModule],
  controllers: [ReservaController],
  providers: [ReservaService, ReservaResolver],
  exports: [ReservaService],
})
export class ReservaModule {}
