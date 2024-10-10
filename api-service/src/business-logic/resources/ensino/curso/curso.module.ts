import { Module } from "@nestjs/common";
import { CampusModule } from "../../ambientes/campus/campus.module";
import { ModalidadeModule } from "../modalidade/modalidade.module";
import { CursoController } from "./curso.controller";
import { CursoResolver } from "./curso.resolver";
import { CursoService } from "./curso.service";

@Module({
  imports: [CampusModule, ModalidadeModule],
  controllers: [CursoController],
  providers: [CursoService, CursoResolver],
  exports: [CursoService],
})
export class CursoModule {}
