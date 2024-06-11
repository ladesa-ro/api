import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      status: 'up',
      service: '@ladesa-ro/api',
    };
  }
}
