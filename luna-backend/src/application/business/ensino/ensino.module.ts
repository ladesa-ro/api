import { Module } from "@nestjs/common";
import { ModalidadeModule } from "./modalidade/modalidade.module";

@Module({
    imports: [
        ModalidadeModule
    ]
})
export class EnsinoModule { }