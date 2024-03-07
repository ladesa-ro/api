import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    const now = new Date();

    if (now.getUTCHours() >= (21 + 4) % 24 && now.getUTCHours() <= 6 + 4) {
      return {
        service: 'sisgea-luna-backend',
        status: 'up',
      };
    } else {
      return {
        service: 'sisgea-luna-backend',
        status: 'up',
      };
    }
  }
}
