import { Injectable, Logger } from '@nestjs/common';
import { MessageBrokerContainerService } from './message-broker-container.service';

@Injectable()
export class MessageBrokerService {
    constructor(
        //

        private messageBrokerContainerService: MessageBrokerContainerService,
    ) { }

    async publishDbEvent() {
        try {
            const broker = await this.messageBrokerContainerService.getBroker();

            Logger.log("PUBLICANDO MENSAGEM")
            await broker.publish('gerar_horario', "teste")
            //.then(
            // (publicationSession) =>
            //     new Promise<void>((resolve, reject) => {
            //         publicationSession.on('error', (err, messageId) => {
            //             if (messageId === dbEvent.id) {
            //                 reject(err);
            //             }
            //         });

            //         publicationSession.on('success', (messageId) => {
            //             if (messageId === dbEvent.id) {
            //                 resolve();
            //             }
            //         });
            //     }),
            //  );

            return true;
        } catch (e) {
            Logger.error(e);
        }

        return false;
    }
}