import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from '../config';

@Injectable()
export class AppService {
  constructor(readonly configService: EnvironmentConfigService) {}

  getHello() {
    return {
      status: 'up',
      service: '@ladesa-ro/api',
      prefix: this.configService.getRuntimePrefix(),
    };
  }
}
