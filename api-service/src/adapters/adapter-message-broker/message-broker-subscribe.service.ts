import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MessageBrokerContainerService } from './message-broker-container.service';
import { AckOrNack, SubscriberSessionAsPromised } from 'rascal';
import { Message } from 'amqplib';
import { loadEnvFile } from 'process';

@Injectable()
export class MessageBrokerSubscribeService implements OnModuleInit {

    #subscription: SubscriberSessionAsPromised | null = null;

    constructor(
        //

        private messageBrokerContainerService: MessageBrokerContainerService,


    ) { }



    onModuleInit() {
        this.setup();
    }

    async setup() {
        if (!this.#subscription) {

            const broker = await this.messageBrokerContainerService.getBroker();

            Logger.log("AQUI")

            const subscribe = await broker.subscribe("horario_gerado")

            subscribe.on('message', (message, content, ackOrNoAck) => {
                Logger.log("Mensagem recebida: " + content.toString())
                ackOrNoAck();
            })

            subscribe.on('error', console.error);

            subscribe.on('message', this.handleMessageBrokerIncomingDbEventMessage.bind(this));

            this.#subscription = subscribe;
        }
    }


    async handleMessageBrokerIncomingDbEventMessage(message: Message, content: any, ackOrNack: AckOrNack) {

    }


}