import { IAuthzStatement, IAuthzStatementFilter } from '@/autorizacao/regras/types/IAuthzStatement';
import { SelectQueryBuilder } from 'typeorm';
import { IUsuarioDaRequisicao } from '@/autenticacao';

export interface IContextoDeAcesso {
  readonly usuario: IUsuarioDaRequisicao | null;

  aplicarFiltro: <Statement extends IAuthzStatementFilter, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    qb: SelectQueryBuilder<any>,
    alias?: string,
    payload?: Payload | null,
  ) => Promise<void>;

  //
  ensurePermission: <Statement extends IAuthzStatement, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    payload: Payload,
    id?: any,
    qb?: SelectQueryBuilder<any> | null,
  ) => Promise<void>;

  verifyPermission<Statement extends IAuthzStatement, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    payload: Payload,
    id?: any,
    qb?: SelectQueryBuilder<any> | null,
  ): Promise<boolean>;
}
