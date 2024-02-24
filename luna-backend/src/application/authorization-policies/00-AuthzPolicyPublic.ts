import { BaseAuthzPolicy } from './BaseAuthzPolicy';
import * as Authz from './statements/IAuthzStatement';
import { createStatement } from './statements/IAuthzStatement';

export class AuthzPolicyPublic extends BaseAuthzPolicy {
  // ========================================================

  get estadoFind(): Authz.IAuthzStatementEstadoFind {
    return createStatement({
      kind: 'filter',
      action: 'estado:find',
      filter: true,
    });
  }

  // ========================================================

  get cidadeFind(): Authz.IAuthzStatementCidadeFind {
    return createStatement({
      kind: 'filter',
      action: 'cidade:find',
      filter: true,
    });
  }

  // ========================================================

  get campusFind(): Authz.IAuthzStatementCampusFind {
    return createStatement({
      kind: 'filter',
      action: 'campus:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get campusCreate(): Authz.IAuthzStatementCampusCreate {
    return createStatement({
      kind: 'check',
      action: 'campus:create',

      async withCheck(context) {
        console.debug('AuthzPolicyPublic -- campus:create', { context });
        return true;
      },
    });
  }

  get campusUpdate(): Authz.IAuthzStatementCampusUpdate {
    return createStatement({
      kind: 'filter',
      action: 'campus:update',
      filter() {
        return (qb, alias = 'campus') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get campusDelete(): Authz.IAuthzStatementCampusDelete {
    return createStatement({
      kind: 'filter',
      action: 'campus:delete',
      filter() {
        return (qb, alias = 'campus') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  // ========================================================

  get blocoFind(): Authz.IAuthzStatementBlocoFind {
    return createStatement({
      kind: 'filter',
      action: 'bloco:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get blocoCreate(): Authz.IAuthzStatementBlocoCreate {
    return createStatement({
      kind: 'check',
      action: 'bloco:create',

      async withCheck(context) {
        console.debug('AuthzPolicyPublic -- bloco:create', { context });
        return true;
      },
    });
  }

  get blocoUpdate(): Authz.IAuthzStatementBlocoUpdate {
    return createStatement({
      kind: 'filter',
      action: 'bloco:update',
      filter() {
        return (qb, alias = 'bloco') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get blocoDelete(): Authz.IAuthzStatementBlocoDelete {
    return createStatement({
      kind: 'filter',
      action: 'bloco:delete',
      filter() {
        return (qb, alias = 'bloco') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  // ========================================================
}
