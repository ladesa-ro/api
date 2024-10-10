import { KeycloakModule } from "@/infrastructure/adapters/adapter-identity-and-access";
import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioResolver } from "./usuario.resolver";
import { UsuarioService } from "./usuario.service";

@Module({
  imports: [KeycloakModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioResolver],
  exports: [UsuarioService],
})
export class UsuarioModule {}
