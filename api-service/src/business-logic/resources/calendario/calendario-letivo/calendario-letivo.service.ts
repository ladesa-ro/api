import type { AccessContext } from "@/access-context";
import { QbEfficientLoad } from "@/business-logic/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/business-logic/standards/ladesa-spec/search/search-strategies";
import { DatabaseContextService } from "@/infrastructure/adapters/adapter-database";
import type { CalendarioLetivoEntity } from "@/infrastructure/adapters/adapter-database/typeorm/entities";
import { paginateConfig } from "@/infrastructure/fixtures";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CampusService } from "../../ambientes/campus/campus.service";
import { ModalidadeService } from "../../ensino/modalidade/modalidade.service";

// ============================================================================

const aliasCalendarioLetivo = "calendarioLetivo";

// ============================================================================

@Injectable()
export class CalendarioLetivoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private modalidadeService: ModalidadeService,
  ) {}

  get calendarioLetivoRepository() {
    return this.databaseContext.calendarioLetivoRepository;
  }

  //

  async calendarioLetivoFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.CalendarioLetivoListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.CalendarioLetivoListCombinedSuccessOutput["body"]> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await accessContext.aplicarFiltro("calendario_letivo:find", qb, aliasCalendarioLetivo, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nome",
        "ano",
        "campus",
        "modalidade",
        //
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        //
        "modalidade.id",
        "modalidade.nome",
        "modalidade.slug",
        //
      ],
      sortableColumns: [
        //
        "nome",
        "ano",
        //
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        //
        "modalidade.id",
        "modalidade.nome",
        "modalidade.slug",
      ],
      searchableColumns: [
        //
        "id",
        //
        "nome",
        "ano",
        "campus",
        "modalidade",
        //
      ],
      relations: {
        campus: true,
        modalidade: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
        "campus.cnpj": [FilterOperator.EQ],
        "campus.razaoSocial": [FilterOperator.EQ],
        "campus.nomeFantasia": [FilterOperator.EQ],
        "modalidade.id": [FilterOperator.EQ],
        "modalidade.nome": [FilterOperator.EQ],
        "modalidade.slug": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.CalendarioLetivo.Views.FindOneResult, qb, aliasCalendarioLetivo, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async caledarioLetivoFindById(
    accessContext: AccessContext,
    dto: LadesaTypings.CalendarioLetivoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.CalendarioLetivoFindOneResult | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await accessContext.aplicarFiltro("calendario_letivo:find", qb, aliasCalendarioLetivo, null);

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.CalendarioLetivo.Views.FindOneResult, qb, aliasCalendarioLetivo, selection);

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.CalendarioLetivoFindOneInput, selection?: string[] | boolean) {
    const calendarioLetivo = await this.caledarioLetivoFindById(accessContext, dto, selection);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimple(
    accessContext: AccessContext,
    id: LadesaTypings.CalendarioLetivoFindOneInput["id"],
    selection?: string[],
  ): Promise<LadesaTypings.CalendarioLetivoFindOneResult | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await accessContext.aplicarFiltro("calendario_letivo:find", qb, aliasCalendarioLetivo, null);

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.CalendarioLetivo.Views.FindOneResult, qb, aliasCalendarioLetivo, selection);

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.CalendarioLetivoFindOneInput["id"], selection?: string[]) {
    const calendarioLetivo = await this.calendarioLetivoFindByIdSimple(accessContext, id, selection);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  //

  async calendarioLetivoCreate(accessContext: AccessContext, dto: LadesaTypings.CalendarioLetivoCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission("calendario_letivo:create", { dto });

    // =========================================================

    const dtoCalendarioLetivo = pick(dto.body, ["nome", "ano"]);

    const calendarioLetivo = this.calendarioLetivoRepository.create();

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.body.campus.id);

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    if (dto.body.modalidade) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(accessContext, dto.body.modalidade.id);

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        modalidade: {
          id: modalidade.id,
        },
      });
    }

    // =========================================================

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    // =========================================================

    return this.calendarioLetivoFindByIdStrict(accessContext, {
      id: calendarioLetivo.id,
    });
  }

  async calendarioLetivoUpdate(accessContext: AccessContext, dto: LadesaTypings.CalendarioLetivoUpdateByIDCombinedInput) {
    // =========================================================

    const currentCalendarioLetivo = await this.calendarioLetivoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("calendario_letivo:update", { dto }, dto.params.id, this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo));

    const dtoCalendarioLetivo = pick(dto.body, ["nome", "ano"]);

    const calendarioLetivo = {
      id: currentCalendarioLetivo.id,
    } as CalendarioLetivoEntity;

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    if (has(dto.body, "campus") && dto.body.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.body.campus.id);

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (has(dto.body, "modalidade") && dto.body.modalidade !== undefined) {
      const modalidade = dto.body.modalidade && (await this.modalidadeService.modalidadeFindByIdSimpleStrict(accessContext, dto.body.modalidade.id));

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        modalidade: modalidade && {
          id: modalidade.id,
        },
      });
    }

    // =========================================================

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    // =========================================================

    return this.calendarioLetivoFindByIdStrict(accessContext, {
      id: calendarioLetivo.id,
    });
  }

  //

  async calendarioLetivoDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.CalendarioLetivoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("calendario_letivo:delete", { dto }, dto.id, this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo));

    // =========================================================

    const calendarioLetivo = await this.calendarioLetivoFindByIdStrict(accessContext, dto);

    // =========================================================

    if (calendarioLetivo) {
      await this.calendarioLetivoRepository
        .createQueryBuilder(aliasCalendarioLetivo)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :calendarioLetivoId", {
          calendarioLetivoId: calendarioLetivo.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
