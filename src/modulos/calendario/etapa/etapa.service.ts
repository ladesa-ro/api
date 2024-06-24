import { EtapaEntity } from '@/integracao-banco-de-dados/typeorm/entities/calendario/etapa.entity';
import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../helpers/ladesa/search/search-strategies';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta, paginateConfig } from '../../../legacy/utils';
import { CalendarioLetivoService, ICalendarioLetivoQueryBuilderViewOptions } from '../calendario-letivo/calendario-letivo.service';

// ============================================================================

const aliasEtapa = 'etapa';

// ============================================================================

export type IEtapaQueryBuilderViewOptions = {
  loadCalendario?: IQueryBuilderViewOptionsLoad<ICalendarioLetivoQueryBuilderViewOptions>;
};

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

  static EtapaQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IEtapaQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.numero`,
      `${alias}.dataInicio`,
      `${alias}.dataTermino`,
      `${alias}.cor`,
    ]);

    const loadCalendario = getQueryBuilderViewLoadMeta(options.loadCalendario, true, `${alias}_calendario`);

    if (loadCalendario) {
      qb.innerJoin(`${alias}.calendario`, `${loadCalendario.alias}`);
      CalendarioLetivoService.CalendarioLetivoQueryBuilderView(loadCalendario.alias, qb, loadCalendario.options);
    }
  }

  //

  async etapaFindAll(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EtapaListCombinedInput | null = null): Promise<LadesaTypings.EtapaListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('etapa:find', qb, aliasEtapa, null);

    // =========================================================

    const paginated = await LadesaSearch('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'numero',
        'dataInicio',
        'dataTermino',
        'cor',
        'calendario',
        //
        'calendario.id',
        'calendario.nome',
        'calendario.ano',
      ],
      sortableColumns: [
        //
        'numero',
        'dataInicio',
        'dataInicio',
        'cor',
        //
        'calendario.id',
        'calendario.nome',
        'calendario.ano',
      ],
      searchableColumns: [
        //
        'id',
        //
        'numero',
        'dataInicio',
        'dataTermino',
        'cor',
        'calendario',
      ],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        'calendario.id': [FilterOperator.EQ],
        'calendario.nome': [FilterOperator.EQ],
        'calendario.ano': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    EtapaService.EtapaQueryBuilderView(aliasEtapa, qb, {});

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async etapaFindById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EtapaFindOneInput): Promise<LadesaTypings.EtapaFindOneResult | null> {
    // =========================================================

    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('etapa:find', qb, aliasEtapa, null);

    // =========================================================

    qb.andWhere(`${aliasEtapa}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    EtapaService.EtapaQueryBuilderView(aliasEtapa, qb, {});

    // =========================================================

    const etapa = await qb.getOne();

    // =========================================================

    return etapa;
  }

  async etapaFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EtapaFindOneInput) {
    const etapa = await this.etapaFindById(contextoDeAcesso, dto);

    if (!etapa) {
      throw new NotFoundException();
    }

    return etapa;
  }

  async etapaFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: LadesaTypings.EtapaFindOneInput['id'],
    options?: IEtapaQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<LadesaTypings.EtapaFindOneResult | null> {
    // =========================================================

    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('etapa:find', qb, aliasEtapa, null);

    // =========================================================

    qb.andWhere(`${aliasEtapa}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    EtapaService.EtapaQueryBuilderView(aliasEtapa, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const etapa = await qb.getOne();

    // =========================================================

    return etapa;
  }

  async EtapaFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: LadesaTypings.EtapaFindOneInput['id'], options?: IEtapaQueryBuilderViewOptions, selection?: string[]) {
    const etapa = await this.etapaFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!etapa) {
      throw new NotFoundException();
    }

    return etapa;
  }

  //

  async etapaCreate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EtapaCreateCombinedInput) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('etapa:create', { dto });

    // =========================================================

    const dtoEtapa = pick(dto.body, ['numero', 'cor', 'dataInicio', 'dataTermino']);

    const etapa = this.etapaRepository.create();

    this.etapaRepository.merge(etapa, {
      ...dtoEtapa,
    });

    // =========================================================

    if (dto.body.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(contextoDeAcesso, dto.body.calendario.id);

      this.etapaRepository.merge(etapa, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.etapaRepository.save(etapa);

    // =========================================================

    return this.etapaFindByIdStrict(contextoDeAcesso, { id: etapa.id });
  }

  async etapaUpdate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EtapaUpdateByIDCombinedInput) {
    // =========================================================

    const currentEtapa = await this.etapaFindByIdStrict(contextoDeAcesso, {
      id: dto.params.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('etapa:update', { dto }, dto.params.id, this.etapaRepository.createQueryBuilder(aliasEtapa));

    const dtoEtapa = pick(dto.body, ['numero', 'cor', 'dataInicio', 'dataTermino']);

    const etapa = {
      id: currentEtapa.id,
    } as EtapaEntity;

    this.etapaRepository.merge(etapa, {
      ...dtoEtapa,
    });

    // =========================================================

    if (has(dto.body, 'calendario') && dto.body.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(contextoDeAcesso, dto.body.calendario!.id);

      this.etapaRepository.merge(etapa, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.etapaRepository.save(etapa);

    // =========================================================

    return this.etapaFindByIdStrict(contextoDeAcesso, { id: etapa.id });
  }

  //

  async etapaDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EtapaFindOneInput) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('etapa:delete', { dto }, dto.id, this.etapaRepository.createQueryBuilder(aliasEtapa));

    // =========================================================

    const etapa = await this.etapaFindByIdStrict(contextoDeAcesso, dto);

    // =========================================================

    if (etapa) {
      await this.etapaRepository
        .createQueryBuilder(aliasEtapa)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :etapaId', { etapaId: etapa.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
