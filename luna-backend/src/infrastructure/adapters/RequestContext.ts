import { ForbiddenException } from '@nestjs/common';
import { IRequestUser } from '@sisgea/nest-auth-connect';
import { SelectQueryBuilder } from 'typeorm';
import { AuthzPublicProvider } from '../../application/authz/AuthzPublicProvider';
import { IRequestContext, IRequestContextAuthz } from '../../domain';
import { IAuthzStatement, IAuthzStatementBaseFind } from '../authz';
import { BaseAuthzProvider } from '../authz/authz-provider/BaseAuthzProvider';

export class RequestContextAuthz implements IRequestContextAuthz {
  #requestContext: RequestContext;
  constructor(requestContext: RequestContext) {
    this.#requestContext = requestContext;
  }

  providers: BaseAuthzProvider[] = [
    //
    new AuthzPublicProvider(),
  ];

  addProvider(provider: BaseAuthzProvider) {
    this.providers.push(provider);
    return this;
  }

  get statements() {
    const statements: IAuthzStatement[] = [];

    for (const provider of this.providers) {
      for (const statement of provider.getStatements()) {
        statements.push(statement);
      }
    }

    return statements;
  }

  applyFindFilter(qb: SelectQueryBuilder<any>, target: string): void {
    const targetStatementsFind = this.statements
      .filter((i): i is IAuthzStatementBaseFind<any> => i.action === 'find')
      .filter((i) => i.target === target);

    // denies all by default
    qb.where('FALSE');

    for (const statement of targetStatementsFind) {
      switch (statement.compositeMode) {
        case 'include': {
          qb.orWhere(statement.filter);
        }
      }
    }
  }

  // =======================================================

  async check<Statement extends IAuthzStatement>(
    action: Statement['action'],
    target: Statement['target'],
    context: any,
  ): Promise<boolean> {
    const targetStatement =
      this.statements.find(
        (statement) =>
          statement.action === action && statement.target === target,
      ) ?? null;

    console.log({ targetStatement });

    if (targetStatement) {
      if (
        targetStatement.action === 'create' ||
        targetStatement.action === 'delete' ||
        targetStatement.action === 'update'
      ) {
        const can = await targetStatement.check(context, this.#requestContext);
        return can;
      }
    }

    return false;
  }

  async ensurePermission<Statement extends IAuthzStatement>(
    action: Statement['action'],
    target: Statement['target'],
    context: any,
  ): Promise<void> {
    const can = await this.check(action, target, context);

    if (!can) {
      throw new ForbiddenException();
    }
  }
}

export class RequestContext implements IRequestContext {
  //
  readonly authz: IRequestContextAuthz = new RequestContextAuthz(this);

  constructor(readonly requestUser: IRequestUser | null) {
    //
  }
}
