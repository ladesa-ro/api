import { Module } from '@nestjs/common';
import { UsuarioVinculoCampusModule } from '../../autenticacao/usuario-vinculo-campus/usuario-vinculo-campus.module';
import { DiarioModule } from '../diario/diario.module';
import { DiarioProfessorController } from './diario-professor.controller';
import { DiarioProfessorResolver } from './diario-professor.resolver';
import { DiarioProfessorService } from './diario-professor.service';

@Module({
  imports: [DiarioModule, UsuarioVinculoCampusModule],
  controllers: [DiarioProfessorController],
  providers: [DiarioProfessorService, DiarioProfessorResolver],
  exports: [DiarioProfessorService],
})
export class DiarioProfessorModule {}
