import { Module } from "@nestjs/common";
import { CalendarioLetivoController } from "./calendario-letivo.controller";
import { CalendarioLetivoService } from "./calendario-letivo.service";



@Module({
    providers:[
        CalendarioLetivoService
    ],
    controllers: [
        CalendarioLetivoController
    ]
})
export class CalendarioLetivoModule {

}