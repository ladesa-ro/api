//

import * as Authz from './statements/IAuthzStatement';

type IAuthzPolicySetup = {
  endereco: {
    find: Authz.IAuthzStatementEnderecoFind['filter'];
  };

  diario: {
    find: Authz.IAuthzStatementDiarioFind['filter'];
    delete: Authz.IAuthzStatementDiarioDelete['filter'];
    update: Authz.IAuthzStatementDiarioUpdate['filter'];
    create: Authz.IAuthzStatementDiarioCreate['withCheck'];
  };

  estado: {
    find: Authz.IAuthzStatementEstadoFind['filter'];
  };

  cidade: {
    find: Authz.IAuthzStatementCidadeFind['filter'];
  };

  campus: {
    find: Authz.IAuthzStatementCampusFind['filter'];
    create: Authz.IAuthzStatementCampusCreate['withCheck'];
    update: Authz.IAuthzStatementCampusUpdate['filter'];
    delete: Authz.IAuthzStatementCampusDelete['filter'];
  };

  bloco: {
    find: Authz.IAuthzStatementBlocoFind['filter'];
    create: Authz.IAuthzStatementBlocoCreate['withCheck'];
    update: Authz.IAuthzStatementBlocoUpdate['filter'];
    delete: Authz.IAuthzStatementBlocoDelete['filter'];
  };

  ambiente: {
    find: Authz.IAuthzStatementAmbienteFind['filter'];
    create: Authz.IAuthzStatementAmbienteCreate['withCheck'];
    update: Authz.IAuthzStatementAmbienteUpdate['filter'];
    delete: Authz.IAuthzStatementAmbienteDelete['filter'];
  };

  reserva: {
    find: Authz.IAuthzStatementReservaFind['filter'];
    delete: Authz.IAuthzStatementReservaDelete['filter'];
    update: Authz.IAuthzStatementReservaUpdate['filter'];
    create: Authz.IAuthzStatementReservaCreate['withCheck'];
  };

  usuario: {
    find: Authz.IAuthzStatementUsuarioFind['filter'];
    create: Authz.IAuthzStatementUsuarioCreate['withCheck'];
    update: Authz.IAuthzStatementUsuarioUpdate['filter'];
    delete: Authz.IAuthzStatementUsuarioDelete['filter'];
  };

  modalidade: {
    find: Authz.IAuthzStatementModalidadeFind['filter'];
    create: Authz.IAuthzStatementModalidadeCreate['withCheck'];
    update: Authz.IAuthzStatementModalidadeUpdate['filter'];
    delete: Authz.IAuthzStatementModalidadeDelete['filter'];
  };

  curso: {
    find: Authz.IAuthzStatementCursoFind['filter'];
    delete: Authz.IAuthzStatementCursoDelete['filter'];
    update: Authz.IAuthzStatementCursoUpdate['filter'];
    create: Authz.IAuthzStatementCursoCreate['withCheck'];
  };

  disciplina: {
    find: Authz.IAuthzStatementDisciplinaFind['filter'];
    delete: Authz.IAuthzStatementDisciplinaDelete['filter'];
    update: Authz.IAuthzStatementDisciplinaUpdate['filter'];
    create: Authz.IAuthzStatementDisciplinaCreate['withCheck'];
  };

  turma: {
    find: Authz.IAuthzStatementTurmaFind['filter'];
    delete: Authz.IAuthzStatementTurmaDelete['filter'];
    update: Authz.IAuthzStatementTurmaUpdate['filter'];
    create: Authz.IAuthzStatementTurmaCreate['withCheck'];
  };

  vinculo: {
    find: Authz.IAuthzStatementVinculoFind['filter'];
  };

  calendarioLetivo: {
    find: Authz.IAuthzStatementCalendarioLetivoFind['filter'];
    delete: Authz.IAuthzStatementCalendarioLetivoDelete['filter'];
    update: Authz.IAuthzStatementCalendarioLetivoUpdate['filter'];
    create: Authz.IAuthzStatementCalendarioLetivoCreate['withCheck'];
  };
};

export class BaseAuthzPolicy {
  statements: Authz.IAuthzStatement[] = [];

  constructor(setup: IAuthzPolicySetup) {
    this.statements.push({
      statementKind: 'filter',
      action: 'diario:find',
      filter: setup.diario.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'endereco:find',
      filter: setup.endereco.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'estado:find',
      filter: setup.estado.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'cidade:find',
      filter: setup.cidade.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'check',
      action: 'campus:create',
      withCheck: setup.campus.create,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'campus:find',
      filter: setup.campus.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'campus:update',
      filter: setup.campus.update,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'campus:delete',
      filter: setup.campus.delete,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'check',
      action: 'bloco:create',
      withCheck: setup.bloco.create,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'bloco:find',
      filter: setup.bloco.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'bloco:update',
      filter: setup.bloco.update,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'bloco:delete',
      filter: setup.bloco.delete,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'check',
      action: 'ambiente:create',
      withCheck: setup.ambiente.create,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'ambiente:find',
      filter: setup.ambiente.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'ambiente:update',
      filter: setup.ambiente.update,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'ambiente:delete',
      filter: setup.ambiente.delete,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'check',
      action: 'usuario:create',
      withCheck: setup.usuario.create,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'usuario:find',
      filter: setup.usuario.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'usuario:update',
      filter: setup.usuario.update,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'usuario:delete',
      filter: setup.usuario.delete,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'check',
      action: 'modalidade:create',
      withCheck: setup.modalidade.create,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'modalidade:find',
      filter: setup.modalidade.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'modalidade:update',
      filter: setup.modalidade.update,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'modalidade:delete',
      filter: setup.modalidade.delete,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'vinculo:find',
      filter: setup.vinculo.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'check',
      action: 'curso:create',
      withCheck: setup.curso.create,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'curso:update',
      filter: setup.curso.update,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'curso:delete',
      filter: setup.curso.delete,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'curso:find',
      filter: setup.curso.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'check',
      action: 'disciplina:create',
      withCheck: setup.disciplina.create,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'disciplina:update',
      filter: setup.disciplina.update,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'disciplina:delete',
      filter: setup.disciplina.delete,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'disciplina:find',
      filter: setup.disciplina.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'check',
      action: 'turma:create',
      withCheck: setup.turma.create,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'turma:update',
      filter: setup.turma.update,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'turma:delete',
      filter: setup.turma.delete,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'turma:find',
      filter: setup.turma.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'check',
      action: 'diario:create',
      withCheck: setup.diario.create,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'diario:update',
      filter: setup.diario.update,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'diario:delete',
      filter: setup.diario.delete,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'diario:find',
      filter: setup.diario.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'check',
      action: 'reserva:create',
      withCheck: setup.reserva.create,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'reserva:update',
      filter: setup.reserva.update,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'reserva:delete',
      filter: setup.reserva.delete,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'reserva:find',
      filter: setup.reserva.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'check',
      action: 'calendario_letivo:create',
      withCheck: setup.calendarioLetivo.create,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'calendario_letivo:find',
      filter: setup.calendarioLetivo.find,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'calendario_letivo:update',
      filter: setup.calendarioLetivo.update,
      payload: null as any,
    });

    this.statements.push({
      statementKind: 'filter',
      action: 'calendario_letivo:delete',
      filter: setup.calendarioLetivo.delete,
      payload: null as any,
    });
  }
}
