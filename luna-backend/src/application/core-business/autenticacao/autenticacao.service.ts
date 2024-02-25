import { Injectable } from '@nestjs/common';
import { IClientAccess } from '../../../domain';

@Injectable()
export class AutenticacaoService {
  quemSouEu(clientAccess: IClientAccess) {
    return {
      usuario: clientAccess.currentUsuario,
    };
  }
}
