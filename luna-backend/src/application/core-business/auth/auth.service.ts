import { Injectable } from '@nestjs/common';
import { IClientAccess } from '../../../domain';

@Injectable()
export class AuthService {
  getWhoAmI(clientAccess: IClientAccess) {
    return {
      usuario: clientAccess.currentUsuario,
    };
  }
}
