import { IRequestUser } from '@sisgea/nest-auth-connect';
import { SelectQueryBuilder } from 'typeorm';

export interface IRequestContextAuthz {
  applyFindFilter(qb: SelectQueryBuilder<any>, target: string): void;

  checkCan(action: string, target: string, targetId?: string): Promise<boolean>;

  ensurePermission(
    action: string,
    target: string,
    targetId?: string,
  ): Promise<void>;
}

export interface IRequestContext {
  readonly requestUser: IRequestUser | null;

  readonly authz: IRequestContextAuthz;
}
