import { DiarioProfessorService } from "@/business-logic/resources/calendario/diario-professor/diario-professor.service";
import { IntervaloDeTempoService } from "@/business-logic/resources/calendario/intervalo-de-tempo/intervalo-de-tempo.service";
import { QbEfficientLoad } from "@/business-logic/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/business-logic/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { HorarioGeradoAulaEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { HorarioGeradoService } from "../horario-gerado/horario-gerado.service";

// ============================================================================

const aliasHorarioGeradoAula = "horario_gerado_dia";

// ============================================================================

@Injectable()
export class HorarioGeradoAulaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private diarioProfessorService: DiarioProfessorService,
    private horarioGeradoService: HorarioGeradoService,
    private intervaloDeTempoService: IntervaloDeTempoService,
  ) {}

  get horarioGeradoAulaRepository() {
    return this.databaseContext.horarioGeradoAulaRepository;
  }

  //

  async horarioGeradoAulaFindAll(
    accessContext: AccessContext,
    dto: PocTypings.HorarioGeradoAulaListOperationInput | null = null,
    selection?: string[] | boolean,
  ): Promise<PocTypings.HorarioGeradoAulaListCombinedSuccessOutput["body"]> {
    // =========================================================

    const qb = this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula);

    // =========================================================

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "diaSemanaIso",
        "horarioGerado",
        "diarioProfessor",
        "intervaloDeTempo",
        //
        "diarioProfessor.id",
        "diarioProfessor.situacao",
        //
        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
        //
        "horarioGerado.id",
        "horarioGerado.status",
        "horarioGerado.tipo",
        "horarioGerado.dataGeracao",
        "horarioGerado.vigenciaInicio",
        "horarioGerado.vigenciaFim",
      ],
      sortableColumns: [
        //
        "diaSemanaIso",
        "horarioGerado",
        "diarioProfessor",
        "intervaloDeTempo",
        //
        "diarioProfessor.id",
        "intervaloDeTempo.id",
        "horarioGerado.id",
      ],
      searchableColumns: [
        //
        "id",
        //
        "diaSemanaIso",
        "horarioGerado",
        "diarioProfessor",
        "intervaloDeTempo",
      ],
      relations: {
        diarioProfessor: true,
        intervaloDeTempo: true,
        horarioGerado: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        // 'diarioProfessor.id': [FilterOperator.EQ],
        "horarioGerado.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(PocTypings.Tokens.HorarioGeradoAula.Views.FindOneResult, qb, aliasHorarioGeradoAula, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async horarioGeradoAulaFindById(
    accessContext: AccessContext,
    dto: PocTypings.HorarioGeradoAulaFindOneInputView,
    selection?: string[] | boolean,
  ): Promise<PocTypings.HorarioGeradoAulaFindOneResult | null> {
    // =========================================================

    const qb = this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula);

    // =========================================================

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    // =========================================================

    qb.andWhere(`${aliasHorarioGeradoAula}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(PocTypings.Tokens.HorarioGeradoAula.Views.FindOneResult, qb, aliasHorarioGeradoAula, selection);
    // =========================================================

    const horarioGeradoAula = await qb.getOne();

    // =========================================================

    return horarioGeradoAula;
  }

  async horarioGeradoAulaFindByIdStrict(accessContext: AccessContext, dto: PocTypings.HorarioGeradoAulaFindOneInputView, selection?: string[] | boolean) {
    const horarioGeradoAula = await this.horarioGeradoAulaFindById(accessContext, dto, selection);

    if (!horarioGeradoAula) {
      throw new NotFoundException();
    }

    return horarioGeradoAula;
  }

  async horarioGeradoAulaFindByIdSimple(
    accessContext: AccessContext,
    id: PocTypings.HorarioGeradoAulaFindOneInputView["id"],
    selection?: string[],
  ): Promise<PocTypings.HorarioGeradoAulaFindOneResult | null> {
    // =========================================================

    const qb = this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula);

    // =========================================================

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    // =========================================================

    qb.andWhere(`${aliasHorarioGeradoAula}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(PocTypings.Tokens.HorarioGeradoAula.Views.FindOneResult, qb, aliasHorarioGeradoAula, selection);

    // =========================================================

    const horarioGeradoAula = await qb.getOne();

    // =========================================================

    return horarioGeradoAula;
  }

  async horarioGeradoAulaFindByIdSimpleStrict(accessContext: AccessContext, id: PocTypings.HorarioGeradoAulaFindOneInputView["id"], selection?: string[]) {
    const horarioGeradoAula = await this.horarioGeradoAulaFindByIdSimple(accessContext, id, selection);

    if (!horarioGeradoAula) {
      throw new NotFoundException();
    }

    return horarioGeradoAula;
  }

  //

  async HorarioGeradoAulaCreate(accessContext: AccessContext, dto: PocTypings.HorarioGeradoAulaCreateOperationInput) {
    // =========================================================

    await accessContext.ensurePermission("horario_gerado_aula:create", { dto });

    // =========================================================

    const dtoHorarioGeradoAula = pick(dto.body, ["diaSemanaIso"]);

    const horarioGeradoAula = this.horarioGeradoAulaRepository.create();

    this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
      ...dtoHorarioGeradoAula,
    });

    // =========================================================

    if (dto.body.diarioProfessor) {
      const diario = await this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, dto.body.diarioProfessor);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        diarioProfessor: {
          id: diario.id,
        },
      });
    }

    if (dto.body.horarioGerado) {
      const horarioGerado = await this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, dto.body.horarioGerado);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        horarioGerado: {
          id: horarioGerado.id,
        },
      });
    }

    if (dto.body.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        intervaloDeTempo: {
          id: intervalo!.id,
        },
      });
    }

    // =========================================================

    await this.horarioGeradoAulaRepository.save(horarioGeradoAula);

    // =========================================================

    return this.horarioGeradoAulaFindByIdStrict(accessContext, {
      id: horarioGeradoAula.id,
    });
  }

  async HorarioGeradoAulaUpdate(accessContext: AccessContext, dto: PocTypings.HorarioGeradoAulaUpdateByIdOperationInput) {
    // =========================================================

    const currentHorarioGeradoAula = await this.horarioGeradoAulaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("horario_gerado_aula:update", { dto }, dto.params.id, this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula));

    const dtoHorarioGeradoAula = pick(dto.body, ["diaSemanaIso"]);

    const horarioGeradoAula = {
      id: currentHorarioGeradoAula.id,
    } as HorarioGeradoAulaEntity;

    this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
      ...dtoHorarioGeradoAula,
    });

    // =========================================================

    if (has(dto.body, "diarioProfessor") && dto.body.diarioProfessor !== undefined) {
      const diarioProfessor = await this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, dto.body.diarioProfessor!);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        diarioProfessor: {
          id: diarioProfessor.id,
        },
      });
    }

    if (has(dto.body, "horarioGerado") && dto.body.horarioGerado !== undefined) {
      const horarioGerado = await this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, dto.body.horarioGerado);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        horarioGerado: {
          id: horarioGerado.id,
        },
      });
    }

    if (has(dto.body, "intervaloDeTempo") && dto.body.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo!);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        intervaloDeTempo: {
          id: intervaloDeTempo!.id,
        },
      });
    }

    // =========================================================

    await this.horarioGeradoAulaRepository.save(horarioGeradoAula);

    // =========================================================

    return this.horarioGeradoAulaFindByIdStrict(accessContext, {
      id: horarioGeradoAula.id,
    });
  }

  //

  async horarioGeradoAulaDeleteOneById(accessContext: AccessContext, dto: PocTypings.HorarioGeradoAulaFindOneInputView) {
    // =========================================================

    await accessContext.ensurePermission("horario_gerado_aula:delete", { dto }, dto.id, this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula));

    // =========================================================

    const horarioGerado = await this.horarioGeradoAulaFindByIdStrict(accessContext, dto);

    // =========================================================

    if (horarioGerado) {
      await this.horarioGeradoAulaRepository
        .createQueryBuilder(aliasHorarioGeradoAula)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :horarioGeradoId", { horarioGeradoId: horarioGerado.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
