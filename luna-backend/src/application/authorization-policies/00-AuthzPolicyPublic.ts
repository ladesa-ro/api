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



  // ========================================================

  get modalidadeFind(): Authz.IAuthzStatementModalidadeFind {
    return createStatement({
      kind: 'filter',
      action: 'modalidade:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get modalidadeCreate(): Authz.IAuthzStatementModalidadeCreate {
    return createStatement({
      kind: 'check',
      action: 'modalidade:create',

      async withCheck(context) {
        console.debug('AuthzPolicyPublic -- modalidade:create', { context });
        return true;
      },
    });
  }

  get modalidadeUpdate(): Authz.IAuthzStatementModalidadeUpdate {
    return createStatement({
      kind: 'filter',
      action: 'modalidade:update',
      filter() {
        return (qb, alias = 'modalidade') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get modalidadeDelete(): Authz.IAuthzStatementModalidadeDelete {
    return createStatement({
      kind: 'filter',
      action: 'modalidade:delete',
      filter() {
        return (qb, alias = 'modalidade') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }
  // ========================================================


  get ambienteFind(): Authz.IAuthzStatementAmbienteFind {
    return createStatement({
      kind: 'filter',
      action: 'ambiente:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get ambienteCreate(): Authz.IAuthzStatementAmbienteCreate {
    return createStatement({
      kind: 'check',
      action: 'ambiente:create',

      async withCheck(context) {
        console.debug('AuthzPolicyPublic -- ambiente:create', { context });
        return true;
      },
    });
  }

  get ambienteUpdate(): Authz.IAuthzStatementAmbienteUpdate {
    return createStatement({
      kind: 'filter',
      action: 'ambiente:update',
      filter() {
        return (qb, alias = 'ambiente') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get ambienteDelete(): Authz.IAuthzStatementAmbienteDelete {
    return createStatement({
      kind: 'filter',
      action: 'ambiente:delete',
      filter() {
        return (qb, alias = 'ambiente') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  // ========================================================

  get usuarioFind(): Authz.IAuthzStatementUsuarioFind {
    return createStatement({
      kind: 'filter',
      action: 'usuario:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get usuarioCreate(): Authz.IAuthzStatementUsuarioCreate {
    return createStatement({
      kind: 'check',
      action: 'usuario:create',

      async withCheck(context) {
        console.debug('AuthzPolicyPublic -- usuario:create', { context });
        return true;
      },
    });
  }

  get usuarioUpdate(): Authz.IAuthzStatementUsuarioUpdate {
    return createStatement({
      kind: 'filter',
      action: 'usuario:update',
      filter() {
        return (qb, alias = 'usuario') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get usuarioDelete(): Authz.IAuthzStatementUsuarioDelete {
    return createStatement({
      kind: 'filter',
      action: 'usuario:delete',
      filter() {
        return (qb, alias = 'usuario') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  // ========================================================

  get vinculoFind(): Authz.IAuthzStatementVinculoFind {
    return createStatement({
      kind: 'filter',
      action: 'vinculo:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  // ========================================================
}
