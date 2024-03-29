import { Injectable, PipeTransform } from '@nestjs/common';
import { ICurrentUsuario } from '../../../authentication/interfaces';
import { DatabaseContextService } from '../../../integrate-database';
import { ContextoDeAcesso } from '../../core/ContextoDeAcesso';

@Injectable()
export class ResolveContextoDeAcessoPipe implements PipeTransform {
  constructor(private databaseContextService: DatabaseContextService) {}

  async transform(currentUsuario: ICurrentUsuario | null /* _metadata: ArgumentMetadata */) {
    return new ContextoDeAcesso(this.databaseContextService, currentUsuario ?? null);
  }
}
