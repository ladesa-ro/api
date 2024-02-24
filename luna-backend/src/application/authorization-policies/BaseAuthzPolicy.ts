//

import * as Authz from './statements/IAuthzStatement';

export abstract class BaseAuthzPolicy {
  abstract estadoFind: Authz.IAuthzStatementEstadoFind;
  abstract cidadeFind: Authz.IAuthzStatementCidadeFind;

  abstract campusFind: Authz.IAuthzStatementCampusFind;
  abstract campusCreate: Authz.IAuthzStatementCampusCreate;
  abstract campusUpdate: Authz.IAuthzStatementCampusUpdate;
  abstract campusDelete: Authz.IAuthzStatementCampusDelete;

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
    ];
  }
}
