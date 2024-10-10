import { Module } from "@nestjs/common";
import { CampusModule } from "../../ambientes/campus/campus.module";
import { UsuarioModule } from "../usuario/usuario.module";
import { VinculoController } from "./vinculo.controller";
import { VinculoResolver } from "./vinculo.resolver";
import { VinculoService } from "./vinculo.service";

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [VinculoController],
  providers: [VinculoService, VinculoResolver],
  exports: [VinculoService],
})
export class VinculoModule {}
