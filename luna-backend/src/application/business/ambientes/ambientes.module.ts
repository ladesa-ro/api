import { Module } from '@nestjs/common';
import { AmbienteModule } from './ambiente/ambiente.module';
import { CidadeModule } from './base-cidade/cidade.module';
import { EstadoModule } from './base-estado/estado.module';
import { BlocoModule } from './bloco/bloco.module';
import { CampusModule } from './campus/campus.module';
import { EnderecoModule } from './endereco/endereco.module';

@Module({
  imports: [
    //
    EstadoModule,
    CidadeModule,
    EnderecoModule,
    CampusModule,
    BlocoModule,
    AmbienteModule,
  ],
})
export class AmbientesModule {}
