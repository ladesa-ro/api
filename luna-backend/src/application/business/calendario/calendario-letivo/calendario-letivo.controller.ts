import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CalendarioLetivoService } from "./calendario-letivo.service";


// GET https://localhost:3000/calendario-letivo/
@ApiTags("Calendarios")
@Controller("/calendario-letivo")
export class CalendarioLetivoController {
    constructor(private calendarioLetivoService: CalendarioLetivoService) {

    }

    @Get("/")
    async listar() {
        return this.calendarioLetivoService.listar();
    }
}