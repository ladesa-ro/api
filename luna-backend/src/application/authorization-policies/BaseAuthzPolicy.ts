//

import * as Authz from './statements/IAuthzStatement';

export abstract class BaseAuthzPolicy {
  abstract estadoFind: Authz.IAuthzStatementEstadoFind;
  abstract cidadeFind: Authz.IAuthzStatementCidadeFind;

  abstract campusFind: Authz.IAuthzStatementCampusFind;
  abstract campusCreate: Authz.IAuthzStatementCampusCreate;
  abstract campusUpdate: Authz.IAuthzStatementCampusUpdate;
  abstract campusDelete: Authz.IAuthzStatementCampusDelete;

  abstract blocoFind: Authz.IAuthzStatementBlocoFind;
  abstract blocoCreate: Authz.IAuthzStatementBlocoCreate;
  abstract blocoUpdate: Authz.IAuthzStatementBlocoUpdate;
  abstract blocoDelete: Authz.IAuthzStatementBlocoDelete;

  abstract ambienteFind: Authz.IAuthzStatementAmbienteFind;
  abstract ambienteCreate: Authz.IAuthzStatementAmbienteCreate;
  abstract ambienteUpdate: Authz.IAuthzStatementAmbienteUpdate;
  abstract ambienteDelete: Authz.IAuthzStatementAmbienteDelete;

  abstract usuarioFind: Authz.IAuthzStatementUsuarioFind;
  abstract usuarioCreate: Authz.IAuthzStatementUsuarioCreate;
  abstract usuarioUpdate: Authz.IAuthzStatementUsuarioUpdate;
  abstract usuarioDelete: Authz.IAuthzStatementUsuarioDelete;

  abstract modalidadeFind: Authz.IAuthzStatementModalidadeFind;
  abstract modalidadeCreate: Authz.IAuthzStatementModalidadeCreate;
  abstract modalidadeUpdate: Authz.IAuthzStatementModalidadeUpdate;
  abstract modalidadeDelete: Authz.IAuthzStatementModalidadeDelete;

  abstract cursoFind: Authz.IAuthzStatementCursoFind;
  abstract cursoDelete: Authz.IAuthzStatementCursoDelete;
  abstract cursoUpdate: Authz.IAuthzStatementCursoUpdate;
  abstract cursoCreate: Authz.IAuthzStatementCursoCreate;

  abstract disciplinaFind: Authz.IAuthzStatementDisciplinaFind;
  abstract disciplinaDelete: Authz.IAuthzStatementDisciplinaDelete;
  abstract disciplinaUpdate: Authz.IAuthzStatementDisciplinaUpdate;
  abstract disciplinaCreate: Authz.IAuthzStatementDisciplinaCreate;

  abstract vinculoFind: Authz.IAuthzStatementVinculoFind;

  get statements() {
    return [
      //
      //
      //
      this.estadoFind,
      this.cidadeFind,
      this.campusFind,
      this.campusCreate,
      this.campusUpdate,
      this.campusDelete,
      this.blocoFind,
      this.blocoCreate,
      this.blocoUpdate,
      this.blocoDelete,
      this.modalidadeFind,
      this.modalidadeCreate,
      this.modalidadeUpdate,
      this.modalidadeDelete,
      this.ambienteFind,
      this.ambienteCreate,
      this.ambienteUpdate,
      this.ambienteDelete,
      this.usuarioFind,
      this.usuarioCreate,
      this.usuarioUpdate,
      this.usuarioDelete,
      this.vinculoFind,
      this.cursoCreate,
      this.cursoUpdate,
      this.cursoDelete,
      this.cursoFind,
      this.disciplinaCreate,
      this.disciplinaUpdate,
      this.disciplinaDelete,
      this.disciplinaFind,
    ];
  }
}
