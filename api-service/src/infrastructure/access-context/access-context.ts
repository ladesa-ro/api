import { createForbiddenExceptionForAction } from "@/business-logic/standards";
import type { IRequestActor } from "@/infrastructure/authentication";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import { castArray } from "lodash";
import type { SelectQueryBuilder } from "typeorm";
import { AuthzPolicyPublic, type IAuthzStatement, type IAuthzStatementFilter, type IBaseAuthzFilterFn, type IBaseAuthzStatementContext } from "../../business-logic/authorization";
import type { IAccessContext } from "./access-context.types";

export class AccessContext implements IAccessContext {
  #policy = new AuthzPolicyPublic();

  constructor(
    readonly databaseContext: DatabaseContextService,
    readonly requestActor: IRequestActor | null,
  ) {
    //
  }

  get statements() {
    return this.#policy.statements;
  }

  async applyFilter<Statement extends IAuthzStatementFilter, Action extends Statement["action"], Payload extends Statement["payload"]>(
    action: Action,
    qb: SelectQueryBuilder<any>,
    alias?: string,
    payload: Payload | null = null,
  ): Promise<void> {
    const statement = this.getStatementForAction<Statement, Action>(action);

    if (statement) {
      const context = this.createAuthzStatementContext<Statement, Action, Payload>(action, payload);

      const filter = statement.filter as boolean | IBaseAuthzFilterFn<Action, Payload>;

      if (typeof filter === "boolean") {
        qb.andWhere(filter ? "TRUE" : "FALSE");
      } else {
        const qbFactory = await filter(context, alias ?? qb.alias);
        qb.andWhere(qbFactory);
      }
    } else {
      qb.andWhere("FALSE");
    }
  }

  async verifyPermission<Statement extends IAuthzStatement, Action extends Statement["action"], Payload extends Statement["payload"]>(
    action: Action,
    payload: Payload,
    id: any = null,
    qbInput: SelectQueryBuilder<any> | null = null,
  ): Promise<boolean> {
    const statement = this.getStatementForAction<Statement, Action>(action);

    const context = this.createAuthzStatementContext(action, payload);

    if (statement) {
      if (statement.statementKind === "check") {
        const withResultFactory = statement.withCheck;

        if (typeof withResultFactory === "boolean") {
          return withResultFactory;
        } else {
          const result = await withResultFactory(context as any);
          return result;
        }
      } else if (statement.statementKind === "filter") {
        const filterAction = action as IAuthzStatementFilter["action"];

        const qb = qbInput ?? this.getQueryBuilderForAction(filterAction);

        await this.applyFilter(filterAction, qb, qb.alias, payload as any);

        if (id) {
          qb.andWhereInIds(castArray(id));
        }

        const hasTarget = await qb.getExists();
        return hasTarget;
      }
    }

    return false;
  }

  async ensurePermission<Statement extends IAuthzStatement, Action extends Statement["action"], Payload extends Statement["payload"]>(
    action: Action,
    payload: Payload,
    id: (number | string) | null = null,
    qb: SelectQueryBuilder<any> | null = null,
  ): Promise<void> {
    const can = await this.verifyPermission<Statement, Action, Payload>(action, payload, id, qb);

    if (!can) {
      throw createForbiddenExceptionForAction<Statement, Action>(action);
    }
  }

  private getStatementForAction<Statement extends IAuthzStatement, Action extends Statement["action"]>(action: Action) {
    return (this.statements.find((statement) => statement.action === action) ?? null) as Statement | null;
  }

  private createAuthzStatementContext<Statement extends IAuthzStatement, Action extends Statement["action"], Payload extends Statement["payload"]>(action: Action, payload: Payload | null) {
    return {
      action,
      payload,
      accessContext: this,
    } as IBaseAuthzStatementContext<Action, Payload>;
  }

  private getQueryBuilderForAction<Action extends IAuthzStatementFilter["action"]>(action: Action) {
    switch (action) {
      case "estado:find": {
        return this.databaseContext.estadoRepository.createQueryBuilder("estado");
      }

      case "cidade:find": {
        return this.databaseContext.cidadeRepository.createQueryBuilder("cidade");
      }

      case "endereco:find": {
        return this.databaseContext.enderecoRepository.createQueryBuilder("endereco");
      }

      case "campus:find":
      case "campus:update":
      case "campus:delete": {
        return this.databaseContext.campusRepository.createQueryBuilder("campus");
      }

      case "bloco:find":
      case "bloco:update":
      case "bloco:delete": {
        return this.databaseContext.blocoRepository.createQueryBuilder("bloco");
      }

      case "ambiente:find":
      case "ambiente:update":
      case "ambiente:delete": {
        return this.databaseContext.ambienteRepository.createQueryBuilder("ambiente");
      }

      case "usuario:find":
      case "usuario:update":
      case "usuario:delete": {
        return this.databaseContext.usuarioRepository.createQueryBuilder("usuario");
      }

      case "modalidade:find":
      case "modalidade:update":
      case "modalidade:delete": {
        return this.databaseContext.modalidadeRepository.createQueryBuilder("modalidade");
      }

      case "vinculo:find": {
        return this.databaseContext.perfilRepository.createQueryBuilder("vinculo");
      }

      case "curso:update":
      case "curso:delete":
      case "curso:find": {
        return this.databaseContext.cursoRepository.createQueryBuilder("curso");
      }

      case "disciplina:update":
      case "disciplina:delete":
      case "disciplina:find": {
        return this.databaseContext.disciplinaRepository.createQueryBuilder("disciplina");
      }

      case "turma:update":
      case "turma:delete":
      case "turma:find": {
        return this.databaseContext.turmaRepository.createQueryBuilder("turma");
      }
      case "diario:update":
      case "diario:delete":
      case "diario:find": {
        return this.databaseContext.diarioRepository.createQueryBuilder("diario");
      }

      case "reserva:update":
      case "reserva:delete":
      case "reserva:find": {
        return this.databaseContext.reservaRepository.createQueryBuilder("reserva");
      }

      case "calendario_letivo:update":
      case "calendario_letivo:delete":
      case "calendario_letivo:find": {
        return this.databaseContext.calendarioLetivoRepository.createQueryBuilder("calendarioLetivo");
      }

      default: {
        throw new TypeError(`getQueryBuilderForAction: dont have repository for action: ${action}`);
      }
    }
  }
}
