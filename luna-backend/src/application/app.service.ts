import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      service: 'sisgea-luna-backend',
      status: 'up',
    };
  }
}
