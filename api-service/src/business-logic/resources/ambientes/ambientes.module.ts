import { Module } from "@nestjs/common";
import { AmbienteModule } from "./ambiente/ambiente.module";
import { BlocoModule } from "./bloco/bloco.module";
import { CampusModule } from "./campus/campus.module";
import { CidadeModule } from "./cidade/cidade.module";
import { EnderecoModule } from "./endereco/endereco.module";
import { EstadoModule } from "./estado/estado.module";
import { ReservaModule } from "./reserva/reserva.module";

@Module({
  imports: [EstadoModule, CidadeModule, EnderecoModule, CampusModule, BlocoModule, AmbienteModule, ReservaModule],
})
export class AmbientesModule {}
