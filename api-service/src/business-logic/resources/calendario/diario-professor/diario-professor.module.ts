import { Module } from "@nestjs/common";
import { VinculoModule } from "../../autenticacao/vinculo/vinculo.module";
import { DiarioModule } from "../diario/diario.module";
import { DiarioProfessorController } from "./diario-professor.controller";
import { DiarioProfessorResolver } from "./diario-professor.resolver";
import { DiarioProfessorService } from "./diario-professor.service";

@Module({
  imports: [DiarioModule, VinculoModule],
  controllers: [DiarioProfessorController],
  providers: [DiarioProfessorService, DiarioProfessorResolver],
  exports: [DiarioProfessorService],
})
export class DiarioProfessorModule {}
