import { VinculoService } from "@/business-logic/resources/autenticacao/vinculo/vinculo.service";
import { QbEfficientLoad } from "@/business-logic/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/business-logic/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { DisponibilidadeProfessorEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";

// ============================================================================

const aliasDisponibilidadeProfessor = "disponibilidade_professor";

// ============================================================================

@Injectable()
export class DisponibilidadeProfessorService {
  constructor(
    private databaseContext: DatabaseContextService,
    private vinculoService: VinculoService,
  ) {}

  get disponibilidadeProfessorRepository() {
    return this.databaseContext.DisponibilidadeProfessorRepository;
  }

  //

  async disponibilidadeProfessorFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.DisponibilidadeProfessorListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DisponibilidadeProfessorListCombinedSuccessOutput["body"]> {
    // =========================================================

    const qb = this.disponibilidadeProfessorRepository.createQueryBuilder(aliasDisponibilidadeProfessor);

    // =========================================================

    await accessContext.aplicarFiltro("disponibilidade_professor:find", qb, aliasDisponibilidadeProfessor, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "dataInicio",
        "dataFim",
        "vinculoProfessor",
        //
        "vinculoProfessor.id",
        "vinculoProfessor.ativo",
        "vinculoProfessor.cargo",
      ],
      sortableColumns: [
        //
        "dataInicio",
        "dataFim",
        //
        "vinculoProfessor.id",
      ],
      searchableColumns: [
        //
        "id",
        //
        "dataInicio",
        "dataFim",
        "vinculoProfessor",
      ],
      relations: {
        vinculoProfessor: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "vinculoProfessor.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeProfessor.Views.FindOneResult, qb, aliasDisponibilidadeProfessor, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async disponibilidadeProfessorFindById(
    accessContext: AccessContext,
    dto: LadesaTypings.DisponibilidadeProfessorFindOneInput,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DisponibilidadeProfessorFindOneResult | null> {
    // =========================================================

    const qb = this.disponibilidadeProfessorRepository.createQueryBuilder(aliasDisponibilidadeProfessor);

    // =========================================================

    await accessContext.aplicarFiltro("disponibilidade_professor:find", qb, aliasDisponibilidadeProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDisponibilidadeProfessor}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeProfessor.Views.FindOneResult, qb, aliasDisponibilidadeProfessor, selection);
    // =========================================================

    const disponibilidadeProfessor = await qb.getOne();

    // =========================================================

    return disponibilidadeProfessor;
  }

  async disponibilidadeProfessorFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeProfessorFindOneInput, selection?: string[] | boolean) {
    const disponibilidadeProfessor = await this.disponibilidadeProfessorFindById(accessContext, dto, selection);

    if (!disponibilidadeProfessor) {
      throw new NotFoundException();
    }

    return disponibilidadeProfessor;
  }

  async disponibilidadeProfessorFindByIdSimple(
    accessContext: AccessContext,
    id: LadesaTypings.DisponibilidadeProfessorFindOneInput["id"],
    selection?: string[],
  ): Promise<LadesaTypings.DisponibilidadeProfessorFindOneResult | null> {
    // =========================================================

    const qb = this.disponibilidadeProfessorRepository.createQueryBuilder(aliasDisponibilidadeProfessor);

    // =========================================================

    await accessContext.aplicarFiltro("disponibilidade_professor:find", qb, aliasDisponibilidadeProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDisponibilidadeProfessor}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeProfessor.Views.FindOneResult, qb, aliasDisponibilidadeProfessor, selection);

    // =========================================================

    const disponibilidadeProfessor = await qb.getOne();

    // =========================================================

    return disponibilidadeProfessor;
  }

  async disponibilidadeProfessorFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.DisponibilidadeProfessorFindOneInput["id"], selection?: string[]) {
    const disponibilidadeProfessor = await this.disponibilidadeProfessorFindByIdSimple(accessContext, id, selection);

    if (!disponibilidadeProfessor) {
      throw new NotFoundException();
    }

    return disponibilidadeProfessor;
  }

  //

  async disponibilidadeProfessorCreate(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeProfessorCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade_professor:create", {
      dto,
    });

    // =========================================================

    const dtoDisponibilidadeProfessor = pick(dto.body, ["dataInicio", "dataFim"]);

    const disponibilidadeProfessor = this.disponibilidadeProfessorRepository.create();

    this.disponibilidadeProfessorRepository.merge(disponibilidadeProfessor, {
      ...dtoDisponibilidadeProfessor,
    });

    // =========================================================

    if (dto.body.vinculoProfessor) {
      const vinculoProfessor = await this.vinculoService.vinculoFindByIdStrict(accessContext, dto.body.vinculoProfessor);

      this.disponibilidadeProfessorRepository.merge(disponibilidadeProfessor, {
        vinculoProfessor: {
          id: vinculoProfessor.id,
        },
      });
    }

    // =========================================================

    await this.disponibilidadeProfessorRepository.save(disponibilidadeProfessor);

    // =========================================================

    return this.disponibilidadeProfessorFindByIdStrict(accessContext, {
      id: disponibilidadeProfessor.id,
    });
  }

  async disponibilidadeProfessorUpdate(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeProfessorUpdateByIDCombinedInput) {
    // =========================================================

    const currentDisponibilidadeProfessor = await this.disponibilidadeProfessorFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("disponibilidade_professor:update", { dto }, dto.params.id, this.disponibilidadeProfessorRepository.createQueryBuilder(aliasDisponibilidadeProfessor));

    const dtoDisponibilidadeProfessor = pick(dto.body, ["dataInicio", "dataFim"]);

    const disponibilidadeProfessor = {
      id: currentDisponibilidadeProfessor.id,
    } as DisponibilidadeProfessorEntity;

    this.disponibilidadeProfessorRepository.merge(disponibilidadeProfessor, {
      ...dtoDisponibilidadeProfessor,
    });

    // =========================================================

    if (has(dto.body, "vinculoProfessor") && dto.body.vinculoProfessor !== undefined) {
      const vinculo = await this.vinculoService.vinculoFindByIdStrict(accessContext, dto.body.vinculoProfessor);

      this.disponibilidadeProfessorRepository.merge(disponibilidadeProfessor, {
        vinculoProfessor: {
          id: vinculo.id,
        },
      });
    }

    // =========================================================

    await this.disponibilidadeProfessorRepository.save(disponibilidadeProfessor);

    // =========================================================

    return this.disponibilidadeProfessorFindByIdStrict(accessContext, {
      id: disponibilidadeProfessor.id,
    });
  }

  //

  async disponibilidadeProfessorDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeProfessorFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade_professor:delete", { dto }, dto.id, this.disponibilidadeProfessorRepository.createQueryBuilder(aliasDisponibilidadeProfessor));

    // =========================================================

    const disponibilidadeProfessor = await this.disponibilidadeProfessorFindByIdStrict(accessContext, dto);

    // =========================================================

    if (disponibilidadeProfessor) {
      await this.disponibilidadeProfessorRepository
        .createQueryBuilder(aliasDisponibilidadeProfessor)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :disponibilidadeProfessorId", {
          disponibilidadeProfessorId: disponibilidadeProfessor.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
