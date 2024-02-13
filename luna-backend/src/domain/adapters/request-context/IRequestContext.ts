import { IRequestUser } from '@sisgea/nest-auth-connect';
import { SelectQueryBuilder } from 'typeorm';

export interface IRequestContextAuthz {
  check(action: string, target: string, context: any): Promise<boolean>;
  applyFindFilter(qb: SelectQueryBuilder<any>, target: string): void;
  ensurePermission(action: string, target: string, context: any): Promise<void>;
}

export interface IRequestContext {
  readonly requestUser: IRequestUser | null;
  readonly authz: IRequestContextAuthz;
}
