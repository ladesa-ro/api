import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import {
  AuthzStatement,
  filterStatementsTargetAndActionFind,
} from '../AuthzStatement';
import { BaseAuthzProvider } from '../authz-provider/BaseAuthzProvider';

export abstract class BaseAuthzController {
  providers: BaseAuthzProvider[] = [];

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

  filter<
    Entity extends ObjectLiteral,
    Query extends SelectQueryBuilder<Entity>,
  >(qb: Query, target: string) {
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

    return qb;
  }
}

export interface RequestContext {
  authz: BaseAuthzController;
}
