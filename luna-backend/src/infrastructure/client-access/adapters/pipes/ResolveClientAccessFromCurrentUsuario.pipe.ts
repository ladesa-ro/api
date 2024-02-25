import { Injectable, PipeTransform } from '@nestjs/common';
import { ICurrentUsuario } from '../../../authentication/interfaces';
import { ClientAccess } from '../../core/ClientAccess';

@Injectable()
export class ResolveClientAccessPipe implements PipeTransform {
  constructor() {}

  async transform(currentUsuario: ICurrentUsuario | null /* _metadata: ArgumentMetadata */) {
    return new ClientAccess(currentUsuario ?? null);
  }
}
