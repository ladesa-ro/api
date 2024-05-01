import { IUsuarioDaRequisicao, UsuarioDaRequisicaoGql, UsuarioDaRequisicaoHttp } from '@/autenticacao';
import { ContextoDeAcesso } from '@/contexto-de-acesso/ContextoDeAcesso';
import { DatabaseContextService } from '@/infraestrutura/integrations/integrate-database';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ResolveContextoDeAcessoPipe implements PipeTransform {
  constructor(private databaseContextService: DatabaseContextService) {}

  async transform(currentUsuario: IUsuarioDaRequisicao | null /* _metadata: ArgumentMetadata */) {
    return new ContextoDeAcesso(this.databaseContextService, currentUsuario ?? null);
  }
}

export const ContextoDeAcessoGraphQl = (options?: any) => UsuarioDaRequisicaoGql(options, ResolveContextoDeAcessoPipe);

export const ContextoDeAcessoHttp = (options?: any) => UsuarioDaRequisicaoHttp(options, ResolveContextoDeAcessoPipe);
