import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { QbEfficientLoad } from '../../../helpers/ladesa/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../helpers/ladesa/search/search-strategies';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { CalendarioLetivoEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta, paginateConfig } from '../../../legacy/utils';
import { CampusService, ICampusQueryBuilderViewOptions } from '../../ambientes/campus/campus.service';
import { ModalidadeService } from '../../ensino/modalidade/modalidade.service';

// ============================================================================

const aliasCalendarioLetivo = 'calendarioLetivo';

// ============================================================================

export type ICalendarioLetivoQueryBuilderViewOptions = {
  loadCampus?: IQueryBuilderViewOptionsLoad<ICampusQueryBuilderViewOptions>;
};

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

  static CalendarioLetivoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: ICalendarioLetivoQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
      `${alias}.ano`,
    ]);

    const loadCampus = getQueryBuilderViewLoadMeta(options.loadCampus, true, `${alias}_campus`);

    if (loadCampus) {
      qb.innerJoin(`${alias}.campus`, `${loadCampus.alias}`);
      CampusService.CampusQueryBuilderView(loadCampus.alias, qb, loadCampus.options);
    }

    qb.leftJoin(`${alias}.modalidade`, `${alias}_modalidade`);
    QbEfficientLoad(LadesaTypings.Tokens.Modalidade.Entity, qb, `${alias}_modalidade`);
  }

  //

  async calendarioLetivoFindAll(
    contextoDeAcesso: IContextoDeAcesso,
    dto: LadesaTypings.CalendarioLetivoListCombinedInput | null = null,
  ): Promise<LadesaTypings.CalendarioLetivoListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('calendario_letivo:find', qb, aliasCalendarioLetivo, null);

    // =========================================================

    const paginated = await LadesaSearch('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        'ano',
        'campus',
        'modalidade',
        //
        'campus.id',
        'campus.cnpj',
        'campus.razaoSocial',
        'campus.nomeFantasia',
        //
        'modalidade.id',
        'modalidade.nome',
        'modalidade.slug',
        //
      ],
      sortableColumns: [
        //
        'nome',
        'ano',
        //
        'campus.id',
        'campus.cnpj',
        'campus.razaoSocial',
        'campus.nomeFantasia',
        //
        'modalidade.id',
        'modalidade.nome',
        'modalidade.slug',
      ],
      searchableColumns: [
        //
        'id',
        //
        'nome',
        'ano',
        'campus',
        'modalidade',
        //
      ],
      relations: {
        campus: true,
        modalidade: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        'campus.id': [FilterOperator.EQ],
        'campus.cnpj': [FilterOperator.EQ],
        'campus.razaoSocial': [FilterOperator.EQ],
        'campus.nomeFantasia': [FilterOperator.EQ],
        'modalidade.id': [FilterOperator.EQ],
        'modalidade.nome': [FilterOperator.EQ],
        'modalidade.slug': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    CalendarioLetivoService.CalendarioLetivoQueryBuilderView(aliasCalendarioLetivo, qb, {});

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async caledarioLetivoFindById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.CalendarioLetivoFindOneInput): Promise<LadesaTypings.CalendarioLetivoFindOneResult | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('calendario_letivo:find', qb, aliasCalendarioLetivo, null);

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    CalendarioLetivoService.CalendarioLetivoQueryBuilderView(aliasCalendarioLetivo, qb, {});

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.CalendarioLetivoFindOneInput) {
    const calendarioLetivo = await this.caledarioLetivoFindById(contextoDeAcesso, dto);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: LadesaTypings.CalendarioLetivoFindOneInput['id'],
    options?: ICalendarioLetivoQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<LadesaTypings.CalendarioLetivoFindOneResult | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('calendario_letivo:find', qb, aliasCalendarioLetivo, null);

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    CalendarioLetivoService.CalendarioLetivoQueryBuilderView(aliasCalendarioLetivo, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo;
  }

  async CalendarioLetivoFindByIdSimpleStrict(
    contextoDeAcesso: IContextoDeAcesso,
    id: LadesaTypings.CalendarioLetivoFindOneInput['id'],
    options?: ICalendarioLetivoQueryBuilderViewOptions,
    selection?: string[],
  ) {
    const calendarioLetivo = await this.calendarioLetivoFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  //

  async calendarioLetivoCreate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.CalendarioLetivoCreateCombinedInput) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('calendario_letivo:create', { dto });

    // =========================================================

    const dtoCalendarioLetivo = pick(dto.body, ['nome', 'ano']);

    const calendarioLetivo = this.calendarioLetivoRepository.create();

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(contextoDeAcesso, dto.body.campus.id);

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    if (dto.body.modalidade) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(contextoDeAcesso, dto.body.modalidade.id);

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        modalidade: {
          id: modalidade.id,
        },
      });
    }

    // =========================================================

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    // =========================================================

    return this.calendarioLetivoFindByIdStrict(contextoDeAcesso, { id: calendarioLetivo.id });
  }

  async calendarioLetivoUpdate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.CalendarioLetivoUpdateByIDCombinedInput) {
    // =========================================================

    const currentCalendarioLetivo = await this.calendarioLetivoFindByIdStrict(contextoDeAcesso, {
      id: dto.params.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('calendario_letivo:update', { dto }, dto.params.id, this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo));

    const dtoCalendarioLetivo = pick(dto.body, ['nome', 'ano']);

    const calendarioLetivo = {
      id: currentCalendarioLetivo.id,
    } as CalendarioLetivoEntity;

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    if (has(dto.body, 'campus') && dto.body.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(contextoDeAcesso, dto.body.campus.id);

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (has(dto.body, 'modalidade') && dto.body.modalidade !== undefined) {
      const modalidade = dto.body.modalidade && (await this.modalidadeService.modalidadeFindByIdSimpleStrict(contextoDeAcesso, dto.body.modalidade.id));

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        modalidade: modalidade && {
          id: modalidade.id,
        },
      });
    }

    // =========================================================

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    // =========================================================

    return this.calendarioLetivoFindByIdStrict(contextoDeAcesso, { id: calendarioLetivo.id });
  }

  //

  async calendarioLetivoDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.CalendarioLetivoFindOneInput) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('calendario_letivo:delete', { dto }, dto.id, this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo));

    // =========================================================

    const calendarioLetivo = await this.calendarioLetivoFindByIdStrict(contextoDeAcesso, dto);

    // =========================================================

    if (calendarioLetivo) {
      await this.calendarioLetivoRepository
        .createQueryBuilder(aliasCalendarioLetivo)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :calendarioLetivoId', { calendarioLetivoId: calendarioLetivo.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
