import { Injectable, PipeTransform } from '@nestjs/common';
import { IRequestUser } from '@sisgea/nest-auth-connect';
import { ClientAccess } from '../../core/ClientAccess';

@Injectable()
export class ResolveClientAccessPipe implements PipeTransform {
  constructor() {}

  async transform(requestUser: IRequestUser | null /* _metadata: ArgumentMetadata */) {
    return new ClientAccess(requestUser);
  }
}
