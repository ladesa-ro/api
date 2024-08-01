import { MessageBrokerService } from "@/adapters";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GerarHorarioService {
    constructor(
        private messageBrokerService: MessageBrokerService
    ) { }


    publishMessage() {
        this.messageBrokerService.publishDbEvent();
        return "Ve se deu la"
    }

}
