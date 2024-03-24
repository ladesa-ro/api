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

  get cursoFind(): Authz.IAuthzStatementCursoFind {
    return createStatement({
      kind: 'filter',
      action: 'curso:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get cursoCreate(): Authz.IAuthzStatementCursoCreate {
    return createStatement({
      kind: 'check',
      action: 'curso:create',

      async withCheck(context) {
        console.debug('AuthzPolicyPublic -- curso:create', { context });
        return true;
      },
    });
  }

  get cursoUpdate(): Authz.IAuthzStatementCursoUpdate {
    return createStatement({
      kind: 'filter',
      action: 'curso:update',
      filter() {
        return (qb, alias = 'curso') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get cursoDelete(): Authz.IAuthzStatementCursoDelete {
    return createStatement({
      kind: 'filter',
      action: 'curso:delete',
      filter() {
        return (qb, alias = 'curso') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  // ========================================================

  get disciplinaFind(): Authz.IAuthzStatementDisciplinaFind {
    return createStatement({
      kind: 'filter',
      action: 'disciplina:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get disciplinaCreate(): Authz.IAuthzStatementDisciplinaCreate {
    return createStatement({
      kind: 'check',
      action: 'disciplina:create',

      async withCheck(context) {
        console.debug('AuthzPolicyPublic -- disciplina:create', { context });
        return true;
      },
    });
  }

  get disciplinaUpdate(): Authz.IAuthzStatementDisciplinaUpdate {
    return createStatement({
      kind: 'filter',
      action: 'disciplina:update',
      filter() {
        return (qb, alias = 'disciplina') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get disciplinaDelete(): Authz.IAuthzStatementDisciplinaDelete {
    return createStatement({
      kind: 'filter',
      action: 'disciplina:delete',
      filter() {
        return (qb, alias = 'disciplina') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  // ========================================================

  get turmaFind(): Authz.IAuthzStatementTurmaFind {
    return createStatement({
      kind: 'filter',
      action: 'turma:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get turmaCreate(): Authz.IAuthzStatementTurmaCreate {
    return createStatement({
      kind: 'check',
      action: 'turma:create',

      async withCheck(context) {
        console.debug('AuthzPolicyPublic -- turma:create', { context });
        return true;
      },
    });
  }

  get turmaUpdate(): Authz.IAuthzStatementTurmaUpdate {
    return createStatement({
      kind: 'filter',
      action: 'turma:update',
      filter() {
        return (qb, alias = 'turma') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get turmaDelete(): Authz.IAuthzStatementTurmaDelete {
    return createStatement({
      kind: 'filter',
      action: 'turma:delete',
      filter() {
        return (qb, alias = 'turma') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  // ========================================================

  get diarioFind(): Authz.IAuthzStatementDiarioFind {
    return createStatement({
      kind: 'filter',
      action: 'diario:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get diarioCreate(): Authz.IAuthzStatementDiarioCreate {
    return createStatement({
      kind: 'check',
      action: 'diario:create',

      async withCheck(context) {
        console.debug('AuthzPolicyPublic -- diario:create', { context });
        return true;
      },
    });
  }

  get diarioUpdate(): Authz.IAuthzStatementDiarioUpdate {
    return createStatement({
      kind: 'filter',
      action: 'diario:update',
      filter() {
        return (qb, alias = 'diario') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get diarioDelete(): Authz.IAuthzStatementDiarioDelete {
    return createStatement({
      kind: 'filter',
      action: 'diario:delete',
      filter() {
        return (qb, alias = 'diario') => {
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

  get reservaFind(): Authz.IAuthzStatementReservaFind {
    return createStatement({
      kind: 'filter',
      action: 'reserva:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get reservaCreate(): Authz.IAuthzStatementReservaCreate {
    return createStatement({
      kind: 'check',
      action: 'reserva:create',

      async withCheck(context) {
        console.debug('AuthzPolicyPublic -- reserva:create', { context });
        return true;
      },
    });
  }

  get reservaUpdate(): Authz.IAuthzStatementReservaUpdate {
    return createStatement({
      kind: 'filter',
      action: 'reserva:update',
      filter() {
        return (qb, alias = 'reserva') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get reservaDelete(): Authz.IAuthzStatementReservaDelete {
    return createStatement({
      kind: 'filter',
      action: 'reserva:delete',
      filter() {
        return (qb, alias = 'reserva') => {
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

  get calendarioLetivoFind(): Authz.IAuthzStatementCalendarioLetivoFind {
    return createStatement({
      kind: 'filter',
      action: 'calendario_letivo:find',

      filter(context, alias) {
        return (qb) => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get calendarioLetivoCreate(): Authz.IAuthzStatementCalendarioLetivoCreate {
    return createStatement({
      kind: 'check',
      action: 'calendario_letivo:create',

      async withCheck(context) {
        console.debug('AuthzPolicyPublic -- calendario_letivo:create', { context });
        return true;
      },
    });
  }

  get calendarioLetivoUpdate(): Authz.IAuthzStatementCalendarioLetivoUpdate {
    return createStatement({
      kind: 'filter',
      action: 'calendario_letivo:update',
      filter() {
        return (qb, alias = 'calendario_letivo') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  get calendarioLetivoDelete(): Authz.IAuthzStatementCalendarioLetivoDelete {
    return createStatement({
      kind: 'filter',
      action: 'calendario_letivo:delete',
      filter() {
        return (qb, alias = 'calendario_letivo') => {
          qb.where(`${alias}.dateDeleted IS NULL`);
        };
      },
    });
  }

  // ========================================================
}
