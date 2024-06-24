import { Inject, Injectable } from '@nestjs/common';
import { AppConfigService } from '../config';

@Injectable()
export class AppService {
  constructor(
    //
    @Inject(AppConfigService)
    readonly configService: AppConfigService,
  ) {}

  getHello() {
    return {
      status: 'up',
      service: '@ladesa-ro/api',
      prefix: this.configService.getRuntimePrefix(),
    };
  }
}
