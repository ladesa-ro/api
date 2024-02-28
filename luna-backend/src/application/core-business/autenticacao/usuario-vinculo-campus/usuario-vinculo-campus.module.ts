import { Module } from '@nestjs/common';
import { CampusModule } from '../../ambientes/campus/campus.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioVinculoCampusController } from './usuario-vinculo-campus.controller';
import { UsuarioVinculoCampusResolver } from './usuario-vinculo-campus.resolver';
import { UsuarioVinculoCampusService } from './usuario-vinculo-campus.service';

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [UsuarioVinculoCampusController],
  providers: [UsuarioVinculoCampusService, UsuarioVinculoCampusResolver],
  exports: [UsuarioVinculoCampusService],
})
export class UsuarioVinculoCampusModule {}
