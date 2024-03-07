import { Module } from "@nestjs/common";
import { CampusModule } from "../../ambientes/campus/campus.module";
import { ModalidadeController } from "./modalidade.controller";
import { CampusResolver } from "./modalidade.resolver";
import { ModalidadeService } from "./modalidade.service";

@Module({
    imports: [CampusModule],
    controllers: [ModalidadeController],
    providers: [ModalidadeService, CampusResolver],
    exports: [ModalidadeService],
})
export class ModalidadeModule { }
