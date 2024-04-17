import { SelectQueryBuilder } from 'typeorm';
import { IAuthzStatement, IAuthzStatementFilter } from '../../application/authorization-policies/statements/IAuthzStatement';
import { ICurrentUsuario } from '../../infrastructure/authentication/interfaces';

export interface IContextoDeAcesso {
  readonly usuario: ICurrentUsuario | null;

  aplicarFiltro: <Statement extends IAuthzStatementFilter, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    qb: SelectQueryBuilder<any>,
    alias?: string,
    payload?: Payload | null,
  ) => Promise<void>;

  //

  verifyPermission<Statement extends IAuthzStatement, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    payload: Payload,
    id?: any,
    qb?: SelectQueryBuilder<any> | null,
  ): Promise<boolean>;

  ensurePermission: <Statement extends IAuthzStatement, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    payload: Payload,
    id?: any,
    qb?: SelectQueryBuilder<any> | null,
  ) => Promise<void>;
}
