import { IBaseAuthzStatementContext } from '../../domain';
import { BaseAuthzPolicy } from './BaseAuthzPolicy';
import * as Authz from './statements/IAuthzStatement';
import { createStatement } from './statements/IAuthzStatement';

export class AuthzPolicySuperUser extends BaseAuthzPolicy {
  // ========================================================

  static shouldApply(context: IBaseAuthzStatementContext<any, any>) {
    const usuario = context.clientAccess.currentUsuario;

    if (usuario && usuario.isSuperUser) {
      return true;
    }

    return false;
  }

  get estadoFind(): Authz.IAuthzStatementEstadoFind {
    return createStatement({
      kind: 'filter',
      action: 'estado:find',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  // ========================================================

  get cidadeFind(): Authz.IAuthzStatementCidadeFind {
    return createStatement({
      kind: 'filter',
      action: 'cidade:find',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  // ========================================================

  get campusFind(): Authz.IAuthzStatementCampusFind {
    return createStatement({
      kind: 'filter',
      action: 'campus:find',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get campusCreate(): Authz.IAuthzStatementCampusCreate {
    return createStatement({
      kind: 'check',
      action: 'campus:create',
      withCheck: (context) => {
        if (AuthzPolicySuperUser.shouldApply(context)) {
          return true;
        }

        return false;
      },
    });
  }

  get campusUpdate(): Authz.IAuthzStatementCampusUpdate {
    return createStatement({
      kind: 'filter',
      action: 'campus:update',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get campusDelete(): Authz.IAuthzStatementCampusDelete {
    return createStatement({
      kind: 'filter',
      action: 'campus:delete',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  // ========================================================

  get blocoFind(): Authz.IAuthzStatementBlocoFind {
    return createStatement({
      kind: 'filter',
      action: 'bloco:find',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get blocoCreate(): Authz.IAuthzStatementBlocoCreate {
    return createStatement({
      kind: 'check',
      action: 'bloco:create',

      withCheck: (context) => {
        if (AuthzPolicySuperUser.shouldApply(context)) {
          return true;
        }
        return false;
      },
    });
  }

  get blocoUpdate(): Authz.IAuthzStatementBlocoUpdate {
    return createStatement({
      kind: 'filter',
      action: 'bloco:update',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get blocoDelete(): Authz.IAuthzStatementBlocoDelete {
    return createStatement({
      kind: 'filter',
      action: 'bloco:delete',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  // ========================================================

  get ambienteFind(): Authz.IAuthzStatementAmbienteFind {
    return createStatement({
      kind: 'filter',
      action: 'ambiente:find',

      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get ambienteCreate(): Authz.IAuthzStatementAmbienteCreate {
    return createStatement({
      kind: 'check',
      action: 'ambiente:create',

      withCheck: (context) => {
        if (AuthzPolicySuperUser.shouldApply(context)) {
          return true;
        }

        return false;
      },
    });
  }

  get ambienteUpdate(): Authz.IAuthzStatementAmbienteUpdate {
    return createStatement({
      kind: 'filter',
      action: 'ambiente:update',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get ambienteDelete(): Authz.IAuthzStatementAmbienteDelete {
    return createStatement({
      kind: 'filter',
      action: 'ambiente:delete',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  // ========================================================

  get usuarioFind(): Authz.IAuthzStatementUsuarioFind {
    return createStatement({
      kind: 'filter',
      action: 'usuario:find',

      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get usuarioCreate(): Authz.IAuthzStatementUsuarioCreate {
    return createStatement({
      kind: 'check',
      action: 'usuario:create',

      withCheck: (context) => {
        if (AuthzPolicySuperUser.shouldApply(context)) {
          return true;
        }

        return false;
      },
    });
  }

  get usuarioUpdate(): Authz.IAuthzStatementUsuarioUpdate {
    return createStatement({
      kind: 'filter',
      action: 'usuario:update',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get usuarioDelete(): Authz.IAuthzStatementUsuarioDelete {
    return createStatement({
      kind: 'filter',
      action: 'usuario:delete',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  // ========================================================

  get vinculoFind(): Authz.IAuthzStatementVinculoFind {
    return createStatement({
      kind: 'filter',
      action: 'vinculo:find',

      filter() {
        return (qb) => {
          qb.where('TRUE');
        };
      },
    });
  }

  // ========================================================
}
