import { ReservaModule } from './reserva/reserva.module';
import { Module } from '@nestjs/common';
import { AmbienteModule } from './ambiente/ambiente.module';
import { BlocoModule } from './bloco/bloco.module';
import { CampusModule } from './campus/campus.module';
import { EnderecoModule } from './endereco/endereco.module';
import { EstadoModule } from './estado/estado.module';
import { CidadeModule } from './cidade/cidade.module';

@Module({
  imports: [EstadoModule, CidadeModule, EnderecoModule, CampusModule, BlocoModule, AmbienteModule, ReservaModule],
})
export class AmbientesModule {}
