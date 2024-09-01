import { Module } from '@nestjs/common';
import { DisponibilidadeProfessorService } from './disponibilidade-professor.service';
import { DisponibilidadeProfessorResolver } from './disponibilidade-professor.resolver';
import { DisponibilidadeProfessorController } from './disponibilidade-professor.controller';
import { VinculoModule } from '@/app-modules/autenticacao/vinculo/vinculo.module';


@Module({
  imports: [VinculoModule],
  providers: [DisponibilidadeProfessorService, DisponibilidadeProfessorResolver],
  controllers: [DisponibilidadeProfessorController],
  exports: [DisponibilidadeProfessorService],
})
export class DisponibilidadeProfessorModule {}
