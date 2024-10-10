import { IntervaloDeTempoService } from "@/business-logic/resources/calendario/intervalo-de-tempo/intervalo-de-tempo.service";
import { QbEfficientLoad } from "@/business-logic/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/business-logic/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { TurmaDisponibilidadeDiaEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { TurmaDisponibilidadeService } from "../turma-disponibilidade/turma-disponibilidade.service";

// ============================================================================

const aliasTurmaDisponibilidadeDia = "turma_disponibilidade_dia";

// ============================================================================

@Injectable()
export class TurmaDisponibilidadeDiaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private intervaloService: IntervaloDeTempoService,
    private turmaDisponibilidadeService: TurmaDisponibilidadeService,
  ) {}

  get turmaDisponibilidadeDiaRepository() {
    return this.databaseContext.turmaDisponibilidadeDiaRepository;
  }

  //

  async turmaDisponibilidadeDiaFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.TurmaDisponibilidadeDiaListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.TurmaDisponibilidadeDiaListCombinedSuccessOutput["body"]> {
    // =========================================================

    const qb = this.turmaDisponibilidadeDiaRepository.createQueryBuilder(aliasTurmaDisponibilidadeDia);

    // =========================================================

    await accessContext.aplicarFiltro("turma_disponibilidade_dia:find", qb, aliasTurmaDisponibilidadeDia, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "diaSemanaIso",
        "turmaDisponibilidade",
        "intervaloDeTempo",
        //
        "turmaDisponibilidade.id",
        "turmaDisponibilidade.dataInicio",
        "turmaDisponibilidade.dataFim",
        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
      ],
      sortableColumns: [
        //
        "diaSemanaIso",
        //
        "turmaDisponibilidade.id",
        "turmaDisponibilidade.dataInicio",
        "turmaDisponibilidade.dataFim",
        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
      ],
      searchableColumns: [
        //
        "id",
        //
        "diaSemanaIso",
        "turmaDisponibilidade",
        "intervaloDeTempo",
      ],
      relations: {
        turmaDisponibilidade: true,
        intervaloDeTempo: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "turmaDisponibilidade.id": [FilterOperator.EQ],
        "intervaloDeTempo.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Views.FindOneResult, qb, aliasTurmaDisponibilidadeDia, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async turmaDisponibilidadeDiaFindById(
    accessContext: AccessContext,
    dto: LadesaTypings.TurmaDisponibilidadeDiaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.TurmaDisponibilidadeDiaFindOneResult | null> {
    // =========================================================

    const qb = this.turmaDisponibilidadeDiaRepository.createQueryBuilder(aliasTurmaDisponibilidadeDia);

    // =========================================================

    await accessContext.aplicarFiltro("turma_disponibilidade_dia:find", qb, aliasTurmaDisponibilidadeDia, null);

    // =========================================================

    qb.andWhere(`${aliasTurmaDisponibilidadeDia}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Views.FindOneResult, qb, aliasTurmaDisponibilidadeDia, selection);
    // =========================================================

    const turmaDisponibilidadeDia = await qb.getOne();

    // =========================================================

    return turmaDisponibilidadeDia;
  }

  async turmaDisponibilidadeDiaFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.TurmaDisponibilidadeDiaFindOneInput, selection?: string[] | boolean) {
    const turmaDisponibilidadeDia = await this.turmaDisponibilidadeDiaFindById(accessContext, dto, selection);

    if (!turmaDisponibilidadeDia) {
      throw new NotFoundException();
    }

    return turmaDisponibilidadeDia;
  }

  async turmaDisponibilidadeDiaFindByIdSimple(
    accessContext: AccessContext,
    id: LadesaTypings.TurmaDisponibilidadeDiaFindOneInput["id"],
    selection?: string[],
  ): Promise<LadesaTypings.TurmaDisponibilidadeDiaFindOneResult | null> {
    // =========================================================

    const qb = this.turmaDisponibilidadeDiaRepository.createQueryBuilder(aliasTurmaDisponibilidadeDia);

    // =========================================================

    await accessContext.aplicarFiltro("turma_disponibilidade_dia:find", qb, aliasTurmaDisponibilidadeDia, null);

    // =========================================================

    qb.andWhere(`${aliasTurmaDisponibilidadeDia}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Views.FindOneResult, qb, aliasTurmaDisponibilidadeDia, selection);

    // =========================================================

    const turmaDisponibilidadeDia = await qb.getOne();

    // =========================================================

    return turmaDisponibilidadeDia;
  }

  async turmaDisponibilidadeDiaFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.TurmaDisponibilidadeDiaFindOneInput["id"], selection?: string[]) {
    const turmaDisponibilidadeDia = await this.turmaDisponibilidadeDiaFindByIdSimple(accessContext, id, selection);

    if (!turmaDisponibilidadeDia) {
      throw new NotFoundException();
    }

    return turmaDisponibilidadeDia;
  }

  //

  async turmaDisponibilidadeDiaCreate(accessContext: AccessContext, dto: LadesaTypings.TurmaDisponibilidadeDiaCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission("turma_disponibilidade_dia:create", {
      dto,
    });

    // =========================================================

    const dtoTurmaDisponibilidadeDia = pick(dto.body, ["diaSemanaIso"]);

    const turmaDisponibilidadeDia = this.turmaDisponibilidadeDiaRepository.create();

    this.turmaDisponibilidadeDiaRepository.merge(turmaDisponibilidadeDia, {
      ...dtoTurmaDisponibilidadeDia,
    });

    // =========================================================

    if (dto.body.intervaloDeTempo) {
      const intervalo = await this.intervaloService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo);

      this.turmaDisponibilidadeDiaRepository.merge(turmaDisponibilidadeDia, {
        intervaloDeTempo: {
          id: intervalo!.id,
        },
      });
    }

    if (dto.body.turmaDisponibilidade) {
      const turma = await this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdSimpleStrict(accessContext, dto.body.turmaDisponibilidade.id);

      this.turmaDisponibilidadeDiaRepository.merge(turmaDisponibilidadeDia, {
        turmaDisponibilidade: {
          id: turma!.id,
        },
      });
    }

    // =========================================================

    await this.turmaDisponibilidadeDiaRepository.save(turmaDisponibilidadeDia);

    // =========================================================

    return this.turmaDisponibilidadeDiaFindByIdStrict(accessContext, {
      id: turmaDisponibilidadeDia.id,
    });
  }

  async turmaDisponibilidadeDiaUpdate(accessContext: AccessContext, dto: LadesaTypings.TurmaDisponibilidadeDiaUpdateByIDCombinedInput) {
    // =========================================================

    const currentTurmaDisponibilidadeDia = await this.turmaDisponibilidadeDiaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("turma_disponibilidade_dia:update", { dto }, dto.params.id, this.turmaDisponibilidadeDiaRepository.createQueryBuilder(aliasTurmaDisponibilidadeDia));

    const dtoTurmaDisponibilidadeDia = pick(dto.body, ["diaSemanaIso"]);

    const turmaDisponibilidadeDia = {
      id: currentTurmaDisponibilidadeDia.id,
    } as TurmaDisponibilidadeDiaEntity;

    this.turmaDisponibilidadeDiaRepository.merge(turmaDisponibilidadeDia, {
      ...dtoTurmaDisponibilidadeDia,
    });

    // =========================================================

    if (has(dto.body, "turmaDisponibilidade") && dto.body.turmaDisponibilidade !== undefined) {
      const turmaDisponibilidade = await this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdSimpleStrict(accessContext, dto.body.turmaDisponibilidade!.id);

      this.turmaDisponibilidadeDiaRepository.merge(turmaDisponibilidadeDia, {
        turmaDisponibilidade: {
          id: turmaDisponibilidade.id,
        },
      });
    }

    if (has(dto.body, "intervaloDeTempo") && dto.body.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo!);

      this.turmaDisponibilidadeDiaRepository.merge(turmaDisponibilidadeDia, {
        intervaloDeTempo: {
          id: intervaloDeTempo!.id,
        },
      });
    }

    // =========================================================

    await this.turmaDisponibilidadeDiaRepository.save(turmaDisponibilidadeDia);

    // =========================================================

    return this.turmaDisponibilidadeDiaFindByIdStrict(accessContext, {
      id: turmaDisponibilidadeDia.id,
    });
  }

  //

  async turmaDisponibilidadeDiaDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.TurmaDisponibilidadeDiaFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("turma_disponibilidade_dia:delete", { dto }, dto.id, this.turmaDisponibilidadeDiaRepository.createQueryBuilder(aliasTurmaDisponibilidadeDia));

    // =========================================================

    const turmaDisponibilidadeDia = await this.turmaDisponibilidadeDiaFindByIdStrict(accessContext, dto);

    // =========================================================

    if (turmaDisponibilidadeDia) {
      await this.turmaDisponibilidadeDiaRepository
        .createQueryBuilder(aliasTurmaDisponibilidadeDia)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :turmaDisponibilidadeDiaId", {
          turmaDisponibilidadeDiaId: turmaDisponibilidadeDia.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
