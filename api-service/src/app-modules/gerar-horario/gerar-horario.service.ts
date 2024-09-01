import { MessageBrokerService } from "@/adapters";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GerarHorarioService {
    constructor(
        private messageBrokerService: MessageBrokerService
    ) { }


    publishMessage() {
        return this.messageBrokerService.publishDbEvent();

    }

}
