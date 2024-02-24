import { Promisable } from 'type-fest';
import { SelectQueryBuilder } from 'typeorm';
import { ClientAccess } from '../../infrastructure';

export interface IBaseAuthzStatement<Kind extends string, Action extends string, Payload> {
  kind: Kind;
  action: Action;
  payload: Payload;
}

export type IBaseAuthzStatementContext<Action extends string, Payload = null> = {
  action: Action;
  payload: Payload;
  clientAccess: ClientAccess;
};

export type IBaseAuthzStatementKindCheck = 'check';
export type IBaseAuthzStatementKindFilter = 'filter';
export type IBaseAuthzStatementKind = IBaseAuthzStatementKindCheck | IBaseAuthzStatementKindFilter;

export type IWithCheckFn<Action extends string, Payload> = (context: IBaseAuthzStatementContext<Action, Payload>) => Promisable<boolean>;

export type IBaseAuthzCheck<Action extends string, Payload = null> = IBaseAuthzStatement<IBaseAuthzStatementKindCheck, Action, Payload> & {
  withCheck: boolean | IWithCheckFn<Action, Payload>;
};

export type IFilterFn<Action extends string, Payload> = (context: IBaseAuthzStatementContext<Action, Payload>, alias?: string) => Promisable<(qb: SelectQueryBuilder<any>) => void>;

export type IBaseAuthzFilter<Action extends string, Payload = null> = IBaseAuthzStatement<IBaseAuthzStatementKindFilter, Action, Payload> & {
  filter: boolean | IFilterFn<Action, Payload>;
};
