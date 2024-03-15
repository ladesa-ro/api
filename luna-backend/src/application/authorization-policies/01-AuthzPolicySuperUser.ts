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

  get modalidadeFind(): Authz.IAuthzStatementModalidadeFind {
    return createStatement({
      kind: 'filter',
      action: 'modalidade:find',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get modalidadeCreate(): Authz.IAuthzStatementModalidadeCreate {
    return createStatement({
      kind: 'check',
      action: 'modalidade:create',

      withCheck: (context) => {
        if (AuthzPolicySuperUser.shouldApply(context)) {
          return true;
        }
        return false;
      },
    });
  }

  get modalidadeUpdate(): Authz.IAuthzStatementModalidadeUpdate {
    return createStatement({
      kind: 'filter',
      action: 'modalidade:update',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get modalidadeDelete(): Authz.IAuthzStatementModalidadeDelete {
    return createStatement({
      kind: 'filter',
      action: 'modalidade:delete',
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

  get cursoFind(): Authz.IAuthzStatementCursoFind {
    return createStatement({
      kind: 'filter',
      action: 'curso:find',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get cursoCreate(): Authz.IAuthzStatementCursoCreate {
    return createStatement({
      kind: 'check',
      action: 'curso:create',

      withCheck: (context) => {
        if (AuthzPolicySuperUser.shouldApply(context)) {
          return true;
        }
        return false;
      },
    });
  }

  get cursoUpdate(): Authz.IAuthzStatementCursoUpdate {
    return createStatement({
      kind: 'filter',
      action: 'curso:update',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get cursoDelete(): Authz.IAuthzStatementCursoDelete {
    return createStatement({
      kind: 'filter',
      action: 'curso:delete',
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

  get disciplinaFind(): Authz.IAuthzStatementDisciplinaFind {
    return createStatement({
      kind: 'filter',
      action: 'disciplina:find',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get disciplinaCreate(): Authz.IAuthzStatementDisciplinaCreate {
    return createStatement({
      kind: 'check',
      action: 'disciplina:create',

      withCheck: (context) => {
        if (AuthzPolicySuperUser.shouldApply(context)) {
          return true;
        }
        return false;
      },
    });
  }

  get disciplinaUpdate(): Authz.IAuthzStatementDisciplinaUpdate {
    return createStatement({
      kind: 'filter',
      action: 'disciplina:update',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get disciplinaDelete(): Authz.IAuthzStatementDisciplinaDelete {
    return createStatement({
      kind: 'filter',
      action: 'disciplina:delete',
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

  get turmaFind(): Authz.IAuthzStatementTurmaFind {
    return createStatement({
      kind: 'filter',
      action: 'turma:find',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get turmaCreate(): Authz.IAuthzStatementTurmaCreate {
    return createStatement({
      kind: 'check',
      action: 'turma:create',

      withCheck: (context) => {
        if (AuthzPolicySuperUser.shouldApply(context)) {
          return true;
        }
        return false;
      },
    });
  }

  get turmaUpdate(): Authz.IAuthzStatementTurmaUpdate {
    return createStatement({
      kind: 'filter',
      action: 'turma:update',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get turmaDelete(): Authz.IAuthzStatementTurmaDelete {
    return createStatement({
      kind: 'filter',
      action: 'turma:delete',
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

  get reservaFind(): Authz.IAuthzStatementReservaFind {
    return createStatement({
      kind: 'filter',
      action: 'reserva:find',

      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get reservaCreate(): Authz.IAuthzStatementReservaCreate {
    return createStatement({
      kind: 'check',
      action: 'reserva:create',

      withCheck: (context) => {
        if (AuthzPolicySuperUser.shouldApply(context)) {
          return true;
        }

        return false;
      },
    });
  }

  get reservaUpdate(): Authz.IAuthzStatementReservaUpdate {
    return createStatement({
      kind: 'filter',
      action: 'reserva:update',
      filter: (context) => {
        return (qb) => {
          if (AuthzPolicySuperUser.shouldApply(context)) {
            qb.where('TRUE');
          }
        };
      },
    });
  }

  get reservaDelete(): Authz.IAuthzStatementReservaDelete {
    return createStatement({
      kind: 'filter',
      action: 'reserva:delete',
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
