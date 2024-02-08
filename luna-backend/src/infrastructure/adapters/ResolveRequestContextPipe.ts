import { Injectable, PipeTransform } from '@nestjs/common';
import { IRequestUser } from '@sisgea/nest-auth-connect';
import { RequestContext } from './RequestContext';

@Injectable()
export class ResolveRequestContextPipe implements PipeTransform {
  constructor() {}

  async transform(
    requestUser: IRequestUser | null /* _metadata: ArgumentMetadata */,
  ) {
    return new RequestContext(requestUser);
  }
}
