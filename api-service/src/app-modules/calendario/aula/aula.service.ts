import { AccessContext } from '@/access-context';
import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';
import { DatabaseContextService } from '../../../adapters/adapter-database';
import { AulaEntity, DiarioEntity } from '../../../adapters/adapter-database/typeorm/entities';
import { QbEfficientLoad } from '../../../app-standards/ladesa-spec/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../app-standards/ladesa-spec/search/search-strategies';
import { paginateConfig } from '../../../fixtures';
import { AmbienteService } from '../../ambientes/ambiente/ambiente.service';
import { CalendarioLetivoService } from '../calendario-letivo/calendario-letivo.service';
import { DiarioService } from '../diario/diario.service';
import { IntervaloDeTempoService } from '../intervalo-de-tempo/intervalo-de-tempo.service';

// ============================================================================

const aliasAula = 'aula';

// ============================================================================

@Injectable()
export class AulaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private diarioService: DiarioService,
    private intervaloService: IntervaloDeTempoService,
    private ambienteService: AmbienteService,
  ) {}

  get aulaRepository() {
    return this.databaseContext.aulaRepository;
  }

  //

  async aulaFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.AulaListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.AulaListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.aulaRepository.createQueryBuilder(aliasAula);

    // =========================================================

    await accessContext.aplicarFiltro('aula:find', qb, aliasAula, null);

    // =========================================================

    const paginated = await LadesaSearch('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'formato',
        'data',
        //
        'intervaloDeTempo.id',
        'intervaloDeTempo.periodoInicio',
        'intervaloDeTempo.periodoFim',
        'diario.id',
        'diario.ativo',
        'ambiente.id',
        'ambiente.nome',
        //
      ],
      sortableColumns: [
        //
        'data',
        'formato',
        //
        'diario.ativo',
        'ambiente.nome',
      ],
      relations: {
        ambiente: true,
        diario: true,
        intervaloDeTempo: true,
      },
      searchableColumns: [
        //
        'id',
        //
        'formato',
        'data',
        'ambiente.nome',
        //
      ],
      defaultSortBy: [],
      filterableColumns: {
        'intervaloDeTempo.id': [FilterOperator.EQ],
        'diario.id': [FilterOperator.EQ],
        'ambiente.id': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Aula.Views.FindOneResult, qb, aliasAula, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async aulaFindById(accessContext: AccessContext, dto: LadesaTypings.AulaFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.AulaFindOneResult | null> {
    // =========================================================

    const qb = this.aulaRepository.createQueryBuilder(aliasAula);

    // =========================================================

    await accessContext.aplicarFiltro('aula:find', qb, aliasAula, null);

    // =========================================================

    qb.andWhere(`${aliasAula}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Aula.Views.FindOneResult, qb, aliasAula, selection);

    // =========================================================

    const aula = await qb.getOne();

    // =========================================================

    return aula;
  }

  async aulaFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.AulaFindOneInput, selection?: string[] | boolean) {
    const aula = await this.aulaFindById(accessContext, dto, selection);

    if (!aula) {
      throw new NotFoundException();
    }

    return aula;
  }

  async aulaFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.AulaFindOneInput['id'], selection?: string[] | boolean): Promise<LadesaTypings.AulaFindOneResult | null> {
    // =========================================================

    const qb = this.aulaRepository.createQueryBuilder(aliasAula);

    // =========================================================

    await accessContext.aplicarFiltro('aula:find', qb, aliasAula, null);

    // =========================================================

    qb.andWhere(`${aliasAula}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Aula.Views.FindOneResult, qb, aliasAula, selection);

    // =========================================================

    const aula = await qb.getOne();

    // =========================================================

    return aula;
  }

  async aulaFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.AulaFindOneInput['id'], selection?: string[] | boolean) {
    const aula = await this.aulaFindByIdSimple(accessContext, id, selection);

    if (!aula) {
      throw new NotFoundException();
    }

    return aula;
  }

  //

  async aulaCreate(accessContext: AccessContext, dto: LadesaTypings.AulaCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission('aula:create', { dto });

    // =========================================================

    const dtoAula = pick(dto.body, ['formato', 'data']);

    const aula = this.aulaRepository.create();

    this.aulaRepository.merge(aula, {
      ...dtoAula,
    });

    // =========================================================

    if (dto.body.ambiente !== null) {
      const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.body.ambiente.id });
      this.aulaRepository.merge(aula, { ambiente: { id: ambiente.id } });
    } else {
      this.aulaRepository.merge(aula, { ambiente: null });
    }

    // =========================================================

   

    const diario = await this.diarioService.diarioFindByIdSimpleStrict(accessContext, dto.body.diario.id);
    this.aulaRepository.merge(aula, { diario: { id: diario.id } });

    // =========================================================

    const intervalo = await this.intervaloService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo);

    this.aulaRepository.merge(aula, { intervaloDeTempo: { id: intervalo!.id } });

    // =========================================================

    await this.aulaRepository.save(aula);

    // =========================================================

    return this.aulaFindByIdStrict(accessContext, { id: aula.id });
  }

  async aulaUpdate(accessContext: AccessContext, dto: LadesaTypings.AulaUpdateByIDCombinedInput) {
    // =========================================================

    const currentAula = await this.aulaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission('aula:update', { dto }, dto.params.id, this.aulaRepository.createQueryBuilder(aliasAula));

    const dtoAula = pick(dto.body, ['formato', 'data', 'intervaloDeTempo', 'diario', 'ambiente']);

    const aula = {
      id: currentAula.id,
    } as AulaEntity;

    this.aulaRepository.merge(aula, {
      ...dtoAula,
    });

    // =========================================================

    if (has(dto.body, 'ambiente') && dto.body.ambiente !== undefined) {
      if (dto.body.ambiente !== null) {
        const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.body.ambiente.id });

        this.aulaRepository.merge(aula, { ambiente: { id: ambiente.id } });
      } else {
        this.aulaRepository.merge(aula, { ambiente: null });
      }
    }

    // =========================================================

    if (has(dto.body, 'diario') && dto.body.diario !== undefined) {
      const diario = await this.diarioService.diarioFindByIdSimpleStrict(accessContext, dto.body.diario.id);

      this.aulaRepository.merge(aula, { diario: { id: diario.id } });
    }

    // =========================================================

    if (has(dto.body, 'intervaloDeTempo') && dto.body.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo);
      this.aulaRepository.merge(aula, { intervaloDeTempo: { id: intervaloDeTempo!.id } });
    }

    // =========================================================

    await this.aulaRepository.save(aula);

    // =========================================================

    return this.aulaFindByIdStrict(accessContext, { id: aula.id });
  }

  //

  async aulaDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.AulaFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission('aula:delete', { dto }, dto.id, this.aulaRepository.createQueryBuilder(aliasAula));

    // =========================================================

    const aula = await this.aulaFindByIdStrict(accessContext, dto);

    // =========================================================

    if (aula) {
      await this.aulaRepository
        .createQueryBuilder(aliasAula)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :aulaId', { aulaId: aula.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
