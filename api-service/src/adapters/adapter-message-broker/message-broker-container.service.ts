import { Injectable } from '@nestjs/common';
import { BrokerAsPromised as Broker, BrokerConfig } from 'rascal';
import { EnvironmentConfigService } from '../environment-config';

@Injectable()
export class MessageBrokerContainerService {
  #broker: Broker | null = null;

  constructor(
    //
    private environmentConfigService: EnvironmentConfigService,
  ) {}

  async setup() {
    if (this.#broker === null) {
      const config = this.getConfig();

      const broker = await Broker.create(config);
      broker.on('error', console.error);

      this.#broker = broker;
    }

    return this.#broker;
  }

  async getBroker() {
    const broker = await this.setup();
    return broker;
  }

  getConfig(): BrokerConfig {
    const config: BrokerConfig = {
      // $schema: './node_modules/rascal/lib/config/schema.json',
      vhosts: {
        '/': {
          connection: {
            url: this.environmentConfigService.getMessageBrokerConnectionURL(),
          },
          exchanges: {
            db_event: {
              type: 'topic',
              options: {
                durable: true,
              },
            },
          },
          publications: {
            db_event: {
              vhost: 'v1',
              exchange: 'db_event',
            },
          },
        },
      },
    };

    return config;
  }
}
