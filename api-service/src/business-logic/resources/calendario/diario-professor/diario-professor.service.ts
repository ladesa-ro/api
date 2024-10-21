import { QbEfficientLoad } from "@/business-logic/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/business-logic/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { DiarioProfessorEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { VinculoService } from "../../autenticacao/vinculo/vinculo.service";
import { DiarioService } from "../diario/diario.service";

// ============================================================================

const aliasDiarioProfessor = "diario_professor";

// ============================================================================

@Injectable()
export class DiarioProfessorService {
  constructor(
    private diarioService: DiarioService,
    private vinculoService: VinculoService,
    private databaseContext: DatabaseContextService,
  ) {}

  get diarioProfessorRepository() {
    return this.databaseContext.diarioProfessorRepository;
  }

  //

  async diarioProfessorFindAll(
    accessContext: AccessContext,
    dto: PocTypings.DiarioProfessorListOperationInput | null = null,
    selection?: string[] | boolean,
  ): Promise<PocTypings.DiarioProfessorListCombinedSuccessOutput["body"]> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "situacao",
        //
        "diario.id",
        //
        "vinculo.id",
        "vinculo.campus.id",
        "vinculo.usuario.id",
        //
      ],
      relations: {
        diario: true,
        vinculo: {
          campus: true,
          usuario: true,
        },
      },
      sortableColumns: [
        //
        "situacao",
        "diario.id",
        "vinculo.campus.id",
        "vinculo.usuario.id",
      ],
      searchableColumns: [
        //
        "id",
        //
        "situacao",
        "diario.id",
        "vinculo.campus.id",
        "vinculo.usuario.id",
        //
      ],
      defaultSortBy: [],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(PocTypings.Tokens.DiarioProfessor.Views.FindOneResult, qb, aliasDiarioProfessor, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async diarioProfessorFindById(
    accessContext: AccessContext,
    dto: PocTypings.DiarioProfessorFindOneInputView,
    selection?: string[] | boolean,
  ): Promise<PocTypings.DiarioProfessorFindOneResult | null> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(PocTypings.Tokens.DiarioProfessor.Views.FindOneResult, qb, aliasDiarioProfessor, selection);

    // =========================================================

    const diarioProfessor = await qb.getOne();

    // =========================================================

    return diarioProfessor;
  }

  async diarioProfessorFindByIdStrict(accessContext: AccessContext, dto: PocTypings.DiarioProfessorFindOneInputView, selection?: string[] | boolean) {
    const diarioProfessor = await this.diarioProfessorFindById(accessContext, dto, selection);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  async diarioProfessorFindByIdSimple(
    accessContext: AccessContext,
    id: PocTypings.DiarioProfessorFindOneInputView["id"],
    selection?: string[] | boolean,
  ): Promise<PocTypings.DiarioProfessorFindOneResult | null> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(PocTypings.Tokens.DiarioProfessor.Views.FindOneResult, qb, aliasDiarioProfessor, selection);

    // =========================================================

    const diarioProfessor = await qb.getOne();

    // =========================================================

    return diarioProfessor;
  }

  async diarioProfessorFindByIdSimpleStrict(accessContext: AccessContext, id: PocTypings.DiarioProfessorFindOneInputView["id"], selection?: string[] | boolean) {
    const diarioProfessor = await this.diarioProfessorFindByIdSimple(accessContext, id, selection);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  //

  async diarioProfessorCreate(accessContext: AccessContext, dto: PocTypings.DiarioProfessorCreateOperationInput) {
    // =========================================================

    await accessContext.ensurePermission("diario_professor:create", { dto });

    // =========================================================

    const dtoDiarioProfessor = pick(dto.body, ["situacao"]);

    const diarioProfessor = this.diarioProfessorRepository.create();

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(dto.body, "diario") && dto.body.diario !== undefined) {
      if (dto.body.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: dto.body.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(dto.body, "perfil") && dto.body.perfil !== undefined) {
      if (dto.body.perfil !== null) {
        const perfil = await this.vinculoService.vinculoFindByIdStrict(accessContext, {
          id: dto.body.perfil.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          vinculo: {
            id: perfil.id,
          },
        });
      }
    }

    // =========================================================

    await this.diarioProfessorRepository.save(diarioProfessor);

    // =========================================================

    return this.diarioProfessorFindByIdStrict(accessContext, {
      id: diarioProfessor.id,
    });
  }

  async diarioProfessorUpdate(accessContext: AccessContext, dto: PocTypings.DiarioProfessorUpdateByIdOperationInput) {
    // =========================================================

    const currentDiarioProfessor = await this.diarioProfessorFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("diario_professor:update", { dto }, dto.params.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor));

    const dtoDiarioProfessor = pick(dto.body, ["situacao"]);

    const diarioProfessor = {
      id: currentDiarioProfessor.id,
    } as DiarioProfessorEntity;

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(dto.body, "diario") && dto.body.diario !== undefined) {
      if (dto.body.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: dto.body.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(dto.body, "perfil") && dto.body.perfil !== undefined) {
      if (dto.body.perfil !== null) {
        const perfil = await this.vinculoService.vinculoFindByIdStrict(accessContext, {
          id: dto.body.perfil.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          vinculo: {
            id: perfil.id,
          },
        });
      }
    }

    // =========================================================

    await this.diarioProfessorRepository.save(diarioProfessor);

    // =========================================================

    return this.diarioProfessorFindByIdStrict(accessContext, {
      id: diarioProfessor.id,
    });
  }

  //

  async diarioProfessorDeleteOneById(accessContext: AccessContext, dto: PocTypings.DiarioProfessorFindOneInputView) {
    // =========================================================

    await accessContext.ensurePermission("diario_professor:delete", { dto }, dto.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor));

    // =========================================================

    const diarioProfessor = await this.diarioProfessorFindByIdStrict(accessContext, dto);

    // =========================================================

    if (diarioProfessor) {
      await this.diarioProfessorRepository
        .createQueryBuilder(aliasDiarioProfessor)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :diarioProfessorId", {
          diarioProfessorId: diarioProfessor.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
