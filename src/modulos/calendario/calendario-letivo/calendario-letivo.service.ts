import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { QbEfficientLoad } from '../../../helpers/ladesa/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../helpers/ladesa/search/search-strategies';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { CalendarioLetivoEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { paginateConfig } from '../../../legacy/utils';
import { CampusService } from '../../ambientes/campus/campus.service';
import { ModalidadeService } from '../../ensino/modalidade/modalidade.service';

// ============================================================================

const aliasCalendarioLetivo = 'calendarioLetivo';

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
    contextoDeAcesso: IContextoDeAcesso,
    dto: LadesaTypings.CalendarioLetivoListCombinedInput | null = null,
    selection?: string[] | boolean,
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
    QbEfficientLoad(LadesaTypings.Tokens.CalendarioLetivo.Views.FindOneResult, qb, aliasCalendarioLetivo, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async caledarioLetivoFindById(
    contextoDeAcesso: IContextoDeAcesso,
    dto: LadesaTypings.CalendarioLetivoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.CalendarioLetivoFindOneResult | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('calendario_letivo:find', qb, aliasCalendarioLetivo, null);

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

  async calendarioLetivoFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.CalendarioLetivoFindOneInput, selection?: string[] | boolean) {
    const calendarioLetivo = await this.caledarioLetivoFindById(contextoDeAcesso, dto, selection);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: LadesaTypings.CalendarioLetivoFindOneInput['id'],
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
    QbEfficientLoad(LadesaTypings.Tokens.CalendarioLetivo.Views.FindOneResult, qb, aliasCalendarioLetivo, selection);

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: LadesaTypings.CalendarioLetivoFindOneInput['id'], selection?: string[]) {
    const calendarioLetivo = await this.calendarioLetivoFindByIdSimple(contextoDeAcesso, id, selection);

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
