import { Module } from '@nestjs/common';
import { CampusModule } from '../../ambientes/campus/campus.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { VinculoController } from './usuario-vinculo-campus.controller';
import { VinculoResolver } from './usuario-vinculo-campus.resolver';
import { VinculoService } from './usuario-vinculo-campus.service';

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [VinculoController],
  providers: [VinculoService, VinculoResolver],
  exports: [VinculoService],
})
export class VinculoModule {}
