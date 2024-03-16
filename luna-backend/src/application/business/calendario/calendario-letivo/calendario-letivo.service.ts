import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CalendarioLetivoService {
    async listar() {
        return "Olá, Pedro!"
    }
}