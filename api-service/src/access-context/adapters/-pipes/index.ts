import { Injectable, PipeTransform } from '@nestjs/common';
import { DatabaseContextService } from '../../../adapters/adapter-database';
import { IRequestActor } from '../../../authentication';
import { AccessContext } from '../../core';

@Injectable()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(private databaseContextService: DatabaseContextService) {}

  async transform(requestActor: IRequestActor | null /* _metadata: ArgumentMetadata */) {
    return new AccessContext(this.databaseContextService, requestActor ?? null);
  }
}
