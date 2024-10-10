import type { AccessContext } from "@/access-context";
import { QbEfficientLoad } from "@/business-logic/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/business-logic/standards/ladesa-spec/search/search-strategies";
import { DatabaseContextService } from "@/infrastructure/adapters/adapter-database";
import type { EtapaEntity } from "@/infrastructure/adapters/adapter-database/typeorm/entities/calendario/etapa.entity";
import { paginateConfig } from "@/infrastructure/fixtures";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CalendarioLetivoService } from "../calendario-letivo/calendario-letivo.service";

// ============================================================================

const aliasEtapa = "etapa";

// ============================================================================

@Injectable()
export class EtapaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService,
  ) {}

  get etapaRepository() {
    return this.databaseContext.etapaRepository;
  }

  //

  async etapaFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.EtapaListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.EtapaListCombinedSuccessOutput["body"]> {
    // =========================================================

    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    // =========================================================

    await accessContext.aplicarFiltro("etapa:find", qb, aliasEtapa, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "numero",
        "dataInicio",
        "dataTermino",
        "cor",
        "calendario",
        //
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      sortableColumns: [
        //
        "numero",
        "dataInicio",
        "dataInicio",
        "cor",
        //
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: [
        //
        "id",
        //
        "numero",
        "dataInicio",
        "dataTermino",
        "cor",
        "calendario",
      ],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    QbEfficientLoad(LadesaTypings.Tokens.Etapa.Views.FindOneResult, qb, aliasEtapa, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async etapaFindById(accessContext: AccessContext, dto: LadesaTypings.EtapaFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.EtapaFindOneResult | null> {
    // =========================================================

    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    // =========================================================

    await accessContext.aplicarFiltro("etapa:find", qb, aliasEtapa, null);

    // =========================================================

    qb.andWhere(`${aliasEtapa}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    QbEfficientLoad(LadesaTypings.Tokens.Etapa.Views.FindOneResult, qb, aliasEtapa, selection);

    // =========================================================

    const etapa = await qb.getOne();

    // =========================================================

    return etapa;
  }

  async etapaFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.EtapaFindOneInput, selection?: string[] | boolean) {
    const etapa = await this.etapaFindById(accessContext, dto, selection);

    if (!etapa) {
      throw new NotFoundException();
    }

    return etapa;
  }

  async etapaFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.EtapaFindOneInput["id"], selection?: string[]): Promise<LadesaTypings.EtapaFindOneResult | null> {
    // =========================================================

    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    // =========================================================

    await accessContext.aplicarFiltro("etapa:find", qb, aliasEtapa, null);

    // =========================================================

    qb.andWhere(`${aliasEtapa}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Etapa.Views.FindOneResult, qb, aliasEtapa, selection);

    // =========================================================

    const etapa = await qb.getOne();

    // =========================================================

    return etapa;
  }

  async EtapaFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.EtapaFindOneInput["id"], selection?: string[]) {
    const etapa = await this.etapaFindByIdSimple(accessContext, id, selection);

    if (!etapa) {
      throw new NotFoundException();
    }

    return etapa;
  }

  //

  async etapaCreate(accessContext: AccessContext, dto: LadesaTypings.EtapaCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission("etapa:create", { dto });

    // =========================================================

    const dtoEtapa = pick(dto.body, ["numero", "cor", "dataInicio", "dataTermino"]);

    const etapa = this.etapaRepository.create();

    this.etapaRepository.merge(etapa, {
      ...dtoEtapa,
    });

    // =========================================================

    if (dto.body.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.body.calendario.id);

      this.etapaRepository.merge(etapa, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.etapaRepository.save(etapa);

    // =========================================================

    return this.etapaFindByIdStrict(accessContext, { id: etapa.id });
  }

  async etapaUpdate(accessContext: AccessContext, dto: LadesaTypings.EtapaUpdateByIDCombinedInput) {
    // =========================================================

    const currentEtapa = await this.etapaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("etapa:update", { dto }, dto.params.id, this.etapaRepository.createQueryBuilder(aliasEtapa));

    const dtoEtapa = pick(dto.body, ["numero", "cor", "dataInicio", "dataTermino"]);

    const etapa = {
      id: currentEtapa.id,
    } as EtapaEntity;

    this.etapaRepository.merge(etapa, {
      ...dtoEtapa,
    });

    // =========================================================

    if (has(dto.body, "calendario") && dto.body.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.body.calendario!.id);

      this.etapaRepository.merge(etapa, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.etapaRepository.save(etapa);

    // =========================================================

    return this.etapaFindByIdStrict(accessContext, { id: etapa.id });
  }

  //

  async etapaDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.EtapaFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("etapa:delete", { dto }, dto.id, this.etapaRepository.createQueryBuilder(aliasEtapa));

    // =========================================================

    const etapa = await this.etapaFindByIdStrict(accessContext, dto);

    // =========================================================

    if (etapa) {
      await this.etapaRepository
        .createQueryBuilder(aliasEtapa)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :etapaId", { etapaId: etapa.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
