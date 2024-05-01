import { AppResource, AppResourceView } from '@/legacy/utils/qbEfficientLoad';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as Dtos from '@sisgea/spec';
import { has, map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CampusService, ICampusQueryBuilderViewOptions } from '../../ambientes/campus/campus.service';
import { ModalidadeService } from '../../ensino/modalidade/modalidade.service';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { CalendarioLetivoEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { getPaginateQueryFromSearchInput, getPaginatedResultDto } from '../../../legacy';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta, paginateConfig } from '../../../legacy/utils';

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
    AppResourceView(AppResource.MODALIDADE, qb, `${alias}_modalidade`);
  }

  //

  async calendarioLetivoFindAll(contextoDeAcesso: IContextoDeAcesso, dto?: Dtos.ISearchInputDto): Promise<Dtos.ICalendarioLetivoFindAllResultDto> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('calendario_letivo:find', qb, aliasCalendarioLetivo, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
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

    return getPaginatedResultDto(paginated);
  }

  async caledarioLetivoFindById(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.ICalendarioLetivoFindOneByIdInputDto): Promise<Dtos.ICalendarioLetivoFindOneResultDto | null> {
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

  async calendarioLetivoFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.ICalendarioLetivoFindOneByIdInputDto) {
    const calendarioLetivo = await this.caledarioLetivoFindById(contextoDeAcesso, dto);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: Dtos.ICalendarioLetivoFindOneByIdInputDto['id'],
    options?: ICalendarioLetivoQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.ICalendarioLetivoFindOneResultDto | null> {
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
    id: Dtos.ICalendarioLetivoFindOneByIdInputDto['id'],
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

  async calendarioLetivoCreate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.ICalendarioLetivoInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('calendario_letivo:create', { dto });

    // =========================================================

    const dtoCalendarioLetivo = pick(dto, ['nome', 'ano']);

    const calendarioLetivo = this.calendarioLetivoRepository.create();

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(contextoDeAcesso, dto.campus.id);

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(contextoDeAcesso, dto.modalidade.id);

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      modalidade: {
        id: modalidade.id,
      },
    });

    // =========================================================

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    // =========================================================

    return this.calendarioLetivoFindByIdStrict(contextoDeAcesso, { id: calendarioLetivo.id });
  }

  async calendarioLetivoUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.ICalendarioLetivoUpdateDto) {
    // =========================================================

    const currentCalendarioLetivo = await this.calendarioLetivoFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('calendario_letivo:update', { dto }, dto.id, this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo));

    const dtoCalendarioLetivo = pick(dto, ['nome', 'ano']);

    const calendarioLetivo = <CalendarioLetivoEntity>{
      id: currentCalendarioLetivo.id,
    };

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    if (has(dto, 'campus') && dto.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(contextoDeAcesso, dto.campus.id);

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (has(dto, 'modalidade') && dto.modalidade !== undefined) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(contextoDeAcesso, dto.modalidade.id);

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

  //

  async calendarioLetivoDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.ICalendarioLetivoDeleteOneByIdInputDto) {
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
