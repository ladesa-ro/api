import { IRequestUser } from '@sisgea/nest-auth-connect';
import { SelectQueryBuilder } from 'typeorm';
import { IAuthzStatementCheck, IAuthzStatementFind } from '../../application/authorization-policies/statements/IAuthzStatement';

export interface IClientAccess {
  readonly requestUser: IRequestUser | null;

  applyFilter: <Statement extends IAuthzStatementFind, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    qb: SelectQueryBuilder<any>,
    alias: string,
    payload: Payload,
  ) => Promise<void>;

  verifyPermissionCheck<Statement extends IAuthzStatementCheck, Action extends Statement['action'], Payload extends Statement['payload']>(action: Action, payload: Payload): Promise<boolean>;

  ensurePermissionCheck: <Statement extends IAuthzStatementCheck, Action extends Statement['action'], Payload extends Statement['payload']>(action: Action, payload: Payload) => Promise<void>;

  verifyCanReach<Statement extends IAuthzStatementFind, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    payload: Payload,
    qb: SelectQueryBuilder<any>,
    id?: any,
  ): Promise<boolean>;

  ensureCanReach: <Statement extends IAuthzStatementFind, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    payload: Payload,
    qb: SelectQueryBuilder<any>,
    id?: any,
  ) => Promise<void>;
}
