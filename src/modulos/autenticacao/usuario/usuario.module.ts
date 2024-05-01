import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioResolver } from './usuario.resolver';
import { UsuarioService } from './usuario.service';
import { KeycloakModule } from '../../../integracao-identidade-e-acesso';

@Module({
  imports: [KeycloakModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioResolver],
  exports: [UsuarioService],
})
export class UsuarioModule {}
