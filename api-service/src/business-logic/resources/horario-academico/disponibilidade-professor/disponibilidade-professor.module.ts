import { VinculoModule } from "@/business-logic/resources/autenticacao/vinculo/vinculo.module";
import { Module } from "@nestjs/common";
import { DisponibilidadeProfessorController } from "./disponibilidade-professor.controller";
import { DisponibilidadeProfessorResolver } from "./disponibilidade-professor.resolver";
import { DisponibilidadeProfessorService } from "./disponibilidade-professor.service";

@Module({
  imports: [VinculoModule],
  providers: [DisponibilidadeProfessorService, DisponibilidadeProfessorResolver],
  controllers: [DisponibilidadeProfessorController],
  exports: [DisponibilidadeProfessorService],
})
export class DisponibilidadeProfessorModule {}
