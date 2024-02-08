import { ForbiddenException } from '@nestjs/common';
import { IRequestUser } from '@sisgea/nest-auth-connect';
import { SelectQueryBuilder } from 'typeorm';
import { AuthzPublicProvider } from '../../application/authz/AuthzPublicProvider';
import { IRequestContext, IRequestContextAuthz } from '../../domain';
import {
  AuthzStatement,
  filterStatementsTargetAndActionFind,
} from '../authz/AuthzStatement';
import { BaseAuthzProvider } from '../authz/authz-provider/BaseAuthzProvider';

export class RequestContextAuthz implements IRequestContextAuthz {
  providers: BaseAuthzProvider[] = [
    //
    new AuthzPublicProvider(),
  ];

  addProvider(provider: BaseAuthzProvider) {
    this.providers.push(provider);
    return this;
  }

  get statements() {
    const statements: AuthzStatement[] = [];

    for (const provider of this.providers) {
      for (const statement of provider.getStatements()) {
        statements.push(statement);
      }
    }

    return statements;
  }

  applyFindFilter(qb: SelectQueryBuilder<any>, target: string): void {
    const targetStatementsFind = filterStatementsTargetAndActionFind(
      this.statements,
      target,
    );

    // denies all by default
    qb.where('FALSE');

    for (const statement of targetStatementsFind) {
      switch (statement.mode) {
        case 'include': {
          qb.orWhere(statement.filter);
        }
      }
    }
  }

  // =======================================================

  async checkCan(
    action: string,
    target: string,
    targetId?: string | undefined,
  ): Promise<boolean> {
    console.warn('FIXME: RequestContextAuthz#checkCan', {
      action,
      target,
      targetId,
    });

    return true;
  }

  async ensurePermission(
    action: string,
    target: string,
    targetId?: string | undefined,
  ): Promise<void> {
    const can = await this.checkCan(action, target, targetId);

    if (!can) {
      throw new ForbiddenException();
    }
  }
}

export class RequestContext implements IRequestContext {
  //
  readonly authz: IRequestContextAuthz = new RequestContextAuthz();

  constructor(readonly requestUser: IRequestUser | null) {
    //
  }
}
