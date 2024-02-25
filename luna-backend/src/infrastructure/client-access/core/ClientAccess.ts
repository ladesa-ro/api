import { ForbiddenException } from '@nestjs/common';
import { castArray } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import { AuthzPolicyPublic } from '../../../application/authorization-policies/00-AuthzPolicyPublic';
import { IAuthzStatement, IAuthzStatementCheck, IAuthzStatementFind } from '../../../application/authorization-policies/statements/IAuthzStatement';
import { IBaseAuthzStatementContext, IFilterFn } from '../../../domain';
import { IClientAccess } from '../../../domain/client-access/IClientAccess';
import { ICurrentUsuario } from '../../authentication/interfaces';

function createForbiddenExceptionForAction<Statement extends IAuthzStatement, Action extends Statement['action']>(action: Action) {
  return new ForbiddenException(`Insufficient permissions to perform '${action}'.`);
}

export class ClientAccess implements IClientAccess {
  constructor(readonly currentUsuario: ICurrentUsuario | null) {
    //
  }

  #policy = new AuthzPolicyPublic();

  get statements() {
    return this.#policy.statements;
  }

  private getStatementForAction<Statement extends IAuthzStatement, Action extends Statement['action']>(action: Action) {
    return (this.statements.find((statement) => statement.action === action) ?? null) as Statement | null;
  }

  private createAuthzStatementContext<Statement extends IAuthzStatement, Action extends Statement['action'], Payload extends Statement['payload']>(action: Action, payload: Payload) {
    return {
      action,
      payload,
      clientAccess: this,
    } as IBaseAuthzStatementContext<Action, Payload>;
  }

  async applyFilter<Statement extends IAuthzStatementFind, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    qb: SelectQueryBuilder<any>,
    alias: string,
    payload: Payload,
  ): Promise<void> {
    const statement = this.getStatementForAction<Statement, Action>(action);

    if (statement) {
      const context = this.createAuthzStatementContext<Statement, Action, Payload>(action, payload);

      const filter = statement.filter as boolean | IFilterFn<Action, Payload>;

      if (typeof filter === 'boolean') {
        qb.andWhere(filter ? 'TRUE' : 'FALSE');
      } else {
        const qbFactory = await filter(context, alias);
        qb.andWhere(qbFactory);
      }
    } else {
      qb.andWhere('FALSE');
    }
  }

  async verifyPermissionCheck<Statement extends IAuthzStatementCheck, Action extends Statement['action'], Payload extends Statement['payload']>(action: Action, payload: Payload): Promise<boolean> {
    const statement = this.getStatementForAction<Statement, Action>(action);

    if (statement) {
      const context = this.createAuthzStatementContext(action, payload);

      if (statement.kind === 'check') {
        const withResultFactory = statement.withCheck;

        if (typeof withResultFactory === 'boolean') {
          return withResultFactory;
        } else {
          const result = await withResultFactory(context as any);
          return result;
        }
      }
    }

    return false;
  }

  async ensurePermissionCheck<Statement extends IAuthzStatementCheck, Action extends Statement['action'], Payload extends Statement['payload']>(action: Action, payload: Payload): Promise<void> {
    const can = await this.verifyPermissionCheck<Statement, Action, Payload>(action, payload);

    if (!can) {
      throw createForbiddenExceptionForAction<Statement, Action>(action);
    }
  }

  async verifyCanReach<Statement extends IAuthzStatementFind, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    payload: Payload,
    qb: SelectQueryBuilder<any>,
    id: any = null,
  ): Promise<boolean> {
    const statement = this.getStatementForAction<Statement, Action>(action);

    if (statement) {
      await this.applyFilter(action, qb, qb.alias, payload);

      if (id) {
        qb.andWhereInIds(castArray(id));
      }

      const hasTarget = await qb.getExists();
      return hasTarget;
    }

    return false;
  }

  async ensureCanReach<Statement extends IAuthzStatementFind, Action extends Statement['action'], Payload extends Statement['payload']>(
    action: Action,
    payload: Payload,
    qb: SelectQueryBuilder<any>,
    id: any = null,
  ): Promise<void> {
    const can = await this.verifyCanReach<Statement, Action, Payload>(action, payload, qb, id);

    if (!can) {
      throw createForbiddenExceptionForAction<Statement, Action>(action);
    }
  }
}
