import { Injectable, PipeTransform } from '@nestjs/common';
import { IRequestActor } from '../../../authentication';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { AccessContext } from '../../core';

@Injectable()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(private databaseContextService: DatabaseContextService) {}

  async transform(requestActor: IRequestActor | null /* _metadata: ArgumentMetadata */) {
    return new AccessContext(this.databaseContextService, requestActor ?? null);
  }
}
