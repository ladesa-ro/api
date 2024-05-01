import { Module } from '@nestjs/common';
import { KeycloakModule } from '../../../../infraestrutura/authentication/integrate-external-identity-and-access-management/keycloak';
import { UsuarioController } from './usuario.controller';
import { UsuarioResolver } from './usuario.resolver';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [KeycloakModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioResolver],
  exports: [UsuarioService],
})
export class UsuarioModule {}
