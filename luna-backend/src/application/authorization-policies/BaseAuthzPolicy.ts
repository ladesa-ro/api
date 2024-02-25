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

  get statements() {
    return [
      //
      this.estadoFind,
      //
      this.cidadeFind,
      //
      this.campusFind,
      this.campusCreate,
      this.campusUpdate,
      this.campusDelete,
      //
      this.blocoFind,
      this.blocoCreate,
      this.blocoUpdate,
      this.blocoDelete,
      //
      this.ambienteFind,
      this.ambienteCreate,
      this.ambienteUpdate,
      this.ambienteDelete,
      //
      this.usuarioFind,
      this.usuarioCreate,
      this.usuarioUpdate,
      this.usuarioDelete,
      //
    ];
  }
}
