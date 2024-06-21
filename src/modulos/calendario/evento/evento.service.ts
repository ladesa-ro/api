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
import { EventoEntity } from '@/integracao-banco-de-dados/typeorm/entities/calendario/evento.entity';

// ============================================================================

const aliasEvento = 'evento';

// ============================================================================

export type IEventoQueryBuilderViewOptions = {
  loadCalendario?: IQueryBuilderViewOptionsLoad<ICalendarioLetivoQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class EventoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService,
  ) {}

  get eventoRepository() {
    return this.databaseContext.eventoRepository;
  }

  //

  static EventoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IEventoQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
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

  async eventoFindAll(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EventoListCombinedInput | null = null): Promise<LadesaTypings.EventoListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('evento:find', qb, aliasEvento, null);

    // =========================================================

    const paginated = await LadesaSearch('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
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
        'nome',
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
        'nome',
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

    EventoService.EventoQueryBuilderView(aliasEvento, qb, {});

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async eventoFindById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EventoFindOneInput): Promise<LadesaTypings.EventoFindOneResult | null> {
    // =========================================================

    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('evento:find', qb, aliasEvento, null);

    // =========================================================

    qb.andWhere(`${aliasEvento}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    EventoService.EventoQueryBuilderView(aliasEvento, qb, {});

    // =========================================================

    const evento = await qb.getOne();

    // =========================================================

    return evento;
  }

  async eventoFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EventoFindOneInput) {
    const evento = await this.eventoFindById(contextoDeAcesso, dto);

    if (!evento) {
      throw new NotFoundException();
    }

    return evento;
  }

  async eventoFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: LadesaTypings.EventoFindOneInput['id'],
    options?: IEventoQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<LadesaTypings.EventoFindOneResult | null> {
    // =========================================================

    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('evento:find', qb, aliasEvento, null);

    // =========================================================

    qb.andWhere(`${aliasEvento}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    EventoService.EventoQueryBuilderView(aliasEvento, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const evento = await qb.getOne();

    // =========================================================

    return evento;
  }

  async EventoFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: LadesaTypings.EventoFindOneInput['id'], options?: IEventoQueryBuilderViewOptions, selection?: string[]) {
    const evento = await this.eventoFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!evento) {
      throw new NotFoundException();
    }

    return evento;
  }

  //

  async eventoCreate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EventoCreateCombinedInput) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('evento:create', { dto });

    // =========================================================

    const dtoEvento = pick(dto.body, ['nome', 'cor', 'data_inicio', 'data_termino']);

    const evento = this.eventoRepository.create();

    this.eventoRepository.merge(evento, {
      ...dtoEvento,
    });

    // =========================================================

    if (dto.body.calendario) {
      const calendario = await this.calendarioLetivoService.CalendarioLetivoFindByIdSimpleStrict(contextoDeAcesso, dto.body.calendario.id);

      this.eventoRepository.merge(evento, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.eventoRepository.save(evento);

    // =========================================================

    return this.eventoFindByIdStrict(contextoDeAcesso, { id: evento.id });
  }

  async eventoUpdate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EventoUpdateByIDCombinedInput) {
    // =========================================================

    const currentEvento = await this.eventoFindByIdStrict(contextoDeAcesso, {
      id: dto.params.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('evento:update', { dto }, dto.params.id, this.eventoRepository.createQueryBuilder(aliasEvento));

    const dtoEvento = pick(dto.body, ['nome', 'cor', 'data_inicio', 'data_termino']);

    const evento = {
      id: currentEvento.id,
    } as EventoEntity;

    this.eventoRepository.merge(evento, {
      ...dtoEvento,
    });

    // =========================================================

    if (has(dto.body, 'calendario') && dto.body.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.CalendarioLetivoFindByIdSimpleStrict(contextoDeAcesso, dto.body.calendario!.id);

      this.eventoRepository.merge(evento, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.eventoRepository.save(evento);

    // =========================================================

    return this.eventoFindByIdStrict(contextoDeAcesso, { id: evento.id });
  }

  //

  async eventoDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EventoFindOneInput) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('evento:delete', { dto }, dto.id, this.eventoRepository.createQueryBuilder(aliasEvento));

    // =========================================================

    const evento = await this.eventoFindByIdStrict(contextoDeAcesso, dto);

    // =========================================================

    if (evento) {
      await this.eventoRepository
        .createQueryBuilder(aliasEvento)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :eventoId', { calendarioLetivoId: evento.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
