import { Promisable } from 'type-fest';
import { SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../contexto-de-acesso';

//

export interface IBaseAuthzStatement<Kind extends string, Action extends string, Payload> {
  statementKind: Kind;
  //
  action: Action;
  payload: Payload;
}

//

export type IBaseAuthzStatementContext<Action extends string, Payload = null> = {
  action: Action;
  //
  payload: Payload;
  //
  contextoDeAcesso: IContextoDeAcesso;
};

//

export type IBaseAuthzStatementKindCheck = 'check';
export type IBaseAuthzStatementKindFilter = 'filter';

//

export type IBaseAuthzStatementKind = IBaseAuthzStatementKindCheck | IBaseAuthzStatementKindFilter;

//

export type IBaseAuthzCheckFn<Action extends string, Payload> = (context: IBaseAuthzStatementContext<Action, Payload>) => Promisable<boolean>;

export type IBaseAuthzCheck<Action extends string, Payload = null> = IBaseAuthzStatement<IBaseAuthzStatementKindCheck, Action, Payload> & {
  withCheck: boolean | IBaseAuthzCheckFn<Action, Payload>;
};

//

export type IBaseAuthzFilterFn<Action extends string, Payload> = (context: IBaseAuthzStatementContext<Action, Payload>, alias?: string) => Promisable<(qb: SelectQueryBuilder<any>) => void>;

export type IBaseAuthzFilter<Action extends string, Payload = null> = IBaseAuthzStatement<IBaseAuthzStatementKindFilter, Action, Payload> & {
  filter: boolean | IBaseAuthzFilterFn<Action, Payload>;
};

//
