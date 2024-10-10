import type { AccessContext } from "@/access-context";
import { IntervaloDeTempoService } from "@/business-logic/resources/calendario/intervalo-de-tempo/intervalo-de-tempo.service";
import { QbEfficientLoad } from "@/business-logic/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/business-logic/standards/ladesa-spec/search/search-strategies";
import { DatabaseContextService } from "@/infrastructure/adapters/adapter-database";
import type { DisponibilidadeProfessorDiaEntity } from "@/infrastructure/adapters/adapter-database/typeorm/entities";
import { paginateConfig } from "@/infrastructure/fixtures";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { DisponibilidadeProfessorService } from "../disponibilidade-professor/disponibilidade-professor.service";

// ============================================================================

const aliasDisponibilidadeProfessorDia = "disponibilidade_professor_dia";

// ============================================================================

@Injectable()
export class DisponibilidadeProfessorDiaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private disponibilidadeProfessorService: DisponibilidadeProfessorService,
    private intervaloDeTempoService: IntervaloDeTempoService,
  ) {}

  get disponibilidadeProfessorDiaRepository() {
    return this.databaseContext.DisponibilidadeProfessorDiaRepository;
  }

  //

  async disponibilidadeProfessorDiaFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.DisponibilidadeProfessorDiaListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DisponibilidadeProfessorDiaListCombinedSuccessOutput["body"]> {
    // =========================================================

    const qb = this.disponibilidadeProfessorDiaRepository.createQueryBuilder(aliasDisponibilidadeProfessorDia);

    // =========================================================

    await accessContext.aplicarFiltro("disponibilidade_professor_dia:find", qb, aliasDisponibilidadeProfessorDia, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "diaSemanaIso",
        "disponibilidade",
        "intervaloDeTempo",
        //
        "disponibilidade.id",
        "disponibilidade.dataInicio",
        "disponibilidade.dataFim",
        //
        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
      ],
      sortableColumns: [
        //
        "diaSemanaIso",
        //
        "disponibilidade.id",
        "intervaloDeTempo.id",
      ],
      searchableColumns: [
        //
        "id",
        //
        "diaSemanaIso",
        "disponibilidade",
        "intervaloDeTempo",
      ],
      relations: {
        disponibilidade: true,
        intervaloDeTempo: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "disponibilidade.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Views.FindOneResult, qb, aliasDisponibilidadeProfessorDia, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async disponibilidadeProfessorDiaFindById(
    accessContext: AccessContext,
    dto: LadesaTypings.DisponibilidadeProfessorDiaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DisponibilidadeProfessorDiaFindOneResult | null> {
    // =========================================================

    const qb = this.disponibilidadeProfessorDiaRepository.createQueryBuilder(aliasDisponibilidadeProfessorDia);

    // =========================================================

    await accessContext.aplicarFiltro("disponibilidade_professor_dia:find", qb, aliasDisponibilidadeProfessorDia, null);

    // =========================================================

    qb.andWhere(`${aliasDisponibilidadeProfessorDia}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Views.FindOneResult, qb, aliasDisponibilidadeProfessorDia, selection);
    // =========================================================

    const disponibilidadeProfessorDia = await qb.getOne();

    // =========================================================

    return disponibilidadeProfessorDia;
  }

  async disponibilidadeProfessorDiaFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeProfessorDiaFindOneInput, selection?: string[] | boolean) {
    const disponibilidadeProfessorDia = await this.disponibilidadeProfessorDiaFindById(accessContext, dto, selection);

    if (!disponibilidadeProfessorDia) {
      throw new NotFoundException();
    }

    return disponibilidadeProfessorDia;
  }

  async disponibilidadeProfessorDiaFindByIdSimple(
    accessContext: AccessContext,
    id: LadesaTypings.DisponibilidadeProfessorDiaFindOneInput["id"],
    selection?: string[],
  ): Promise<LadesaTypings.DisponibilidadeProfessorDiaFindOneResult | null> {
    // =========================================================

    const qb = this.disponibilidadeProfessorDiaRepository.createQueryBuilder(aliasDisponibilidadeProfessorDia);

    // =========================================================

    await accessContext.aplicarFiltro("disponibilidade_professor_dia:find", qb, aliasDisponibilidadeProfessorDia, null);

    // =========================================================

    qb.andWhere(`${aliasDisponibilidadeProfessorDia}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Views.FindOneResult, qb, aliasDisponibilidadeProfessorDia, selection);

    // =========================================================

    const disponibilidadeProfessorDia = await qb.getOne();

    // =========================================================

    return disponibilidadeProfessorDia;
  }

  async disponibilidadeProfessorDiaFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.DisponibilidadeProfessorDiaFindOneInput["id"], selection?: string[]) {
    const disponibilidadeProfessorDia = await this.disponibilidadeProfessorDiaFindByIdSimple(accessContext, id, selection);

    if (!disponibilidadeProfessorDia) {
      throw new NotFoundException();
    }

    return disponibilidadeProfessorDia;
  }

  //

  async disponibilidadeProfessorDiaCreate(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeProfessorDiaCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade_professor_dia:create", { dto });

    // =========================================================

    const dtoDisponibilidadeProfessorDia = pick(dto.body, ["diaSemanaIso"]);

    const disponibilidadeProfessorDia = this.disponibilidadeProfessorDiaRepository.create();

    this.disponibilidadeProfessorDiaRepository.merge(disponibilidadeProfessorDia, {
      ...dtoDisponibilidadeProfessorDia,
    });

    // =========================================================

    if (dto.body.disponibilidade) {
      const disponibilidade = await this.disponibilidadeProfessorService.disponibilidadeProfessorFindByIdStrict(accessContext, dto.body.disponibilidade);

      this.disponibilidadeProfessorDiaRepository.merge(disponibilidadeProfessorDia, {
        disponibilidade: {
          id: disponibilidade.id,
        },
      });
    }

    if (dto.body.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo);

      this.disponibilidadeProfessorDiaRepository.merge(disponibilidadeProfessorDia, {
        intervaloDeTempo: {
          id: intervalo!.id,
        },
      });
    }

    // =========================================================

    await this.disponibilidadeProfessorDiaRepository.save(disponibilidadeProfessorDia);

    // =========================================================

    return this.disponibilidadeProfessorDiaFindByIdStrict(accessContext, {
      id: disponibilidadeProfessorDia.id,
    });
  }

  async disponibilidadeProfessorDiaUpdate(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeProfessorDiaUpdateByIDCombinedInput) {
    // =========================================================

    const currentDisponibilidadeProfessorDia = await this.disponibilidadeProfessorDiaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission(
      "disponibilidade_professor_dia:update",
      { dto },
      dto.params.id,
      this.disponibilidadeProfessorDiaRepository.createQueryBuilder(aliasDisponibilidadeProfessorDia),
    );

    const dtoDisponibilidadeProfessorDia = pick(dto.body, ["diaSemanaIso"]);

    const disponibilidadeProfessorDia = {
      id: currentDisponibilidadeProfessorDia.id,
    } as DisponibilidadeProfessorDiaEntity;

    this.disponibilidadeProfessorDiaRepository.merge(disponibilidadeProfessorDia, {
      ...dtoDisponibilidadeProfessorDia,
    });

    // =========================================================

    if (has(dto.body, "disponibilidade") && dto.body.disponibilidade !== undefined) {
      const disponibilidade = await this.disponibilidadeProfessorService.disponibilidadeProfessorFindByIdStrict(accessContext, dto.body.disponibilidade);

      this.disponibilidadeProfessorDiaRepository.merge(disponibilidadeProfessorDia, {
        disponibilidade: {
          id: disponibilidade.id,
        },
      });
    }

    if (has(dto.body, "intervaloDeTempo") && dto.body.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo);

      this.disponibilidadeProfessorDiaRepository.merge(disponibilidadeProfessorDia, {
        intervaloDeTempo: {
          id: intervaloDeTempo!.id,
        },
      });
    }

    // =========================================================

    await this.disponibilidadeProfessorDiaRepository.save(disponibilidadeProfessorDia);

    // =========================================================

    return this.disponibilidadeProfessorDiaFindByIdStrict(accessContext, {
      id: disponibilidadeProfessorDia.id,
    });
  }

  //

  async disponibilidadeProfessorDiaDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeProfessorFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade_professor_dia:delete", { dto }, dto.id, this.disponibilidadeProfessorDiaRepository.createQueryBuilder(aliasDisponibilidadeProfessorDia));

    // =========================================================

    const disponibilidadeProfessorDia = await this.disponibilidadeProfessorDiaFindByIdStrict(accessContext, dto);

    // =========================================================

    if (disponibilidadeProfessorDia) {
      await this.disponibilidadeProfessorDiaRepository
        .createQueryBuilder(aliasDisponibilidadeProfessorDia)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :disponibilidadeProfessorDiaId", {
          disponibilidadeProfessorDiaId: disponibilidadeProfessorDia.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
