import { AccessContext } from '@/access-context';
import { DiaCalendarioEntity } from '@/adapters/adapter-database/typeorm/entities/calendario/dia-calendario.entity';
import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';
import { DatabaseContextService } from '../../../adapters/adapter-database';
import { QbEfficientLoad } from '../../../app-standards/ladesa-spec/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../app-standards/ladesa-spec/search/search-strategies';
import { paginateConfig } from '../../../fixtures';
import { CalendarioLetivoService } from '../calendario-letivo/calendario-letivo.service';

// ============================================================================

const aliasDiaCalendario = 'diaCalendario';

// ============================================================================

@Injectable()
export class DiaCalendarioService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService,
  ) {}

  get diaCalendarioRepository() {
    return this.databaseContext.diaCalendarioRepository;
  }

  //

  async diaCalendarioFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.DiaCalendarioListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DiaCalendarioListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.aplicarFiltro('dia_calendario:find', qb, aliasDiaCalendario, null);

    // =========================================================

    const paginated = await LadesaSearch('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'data',
        'diaLetivo',
        'feriado',
        'calendario',
        //
        'calendario.id',
        'calendario.nome',
        'calendario.ano',
      ],
      sortableColumns: [
        //
        'data',
        'diaLetivo',
        'feriado',
        //
        'calendario.id',
        'calendario.nome',
        'calendario.ano',
      ],
      searchableColumns: [
        //
        'id',
        //
        'data',
        'diaLetivo',
        'feriado',
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
    QbEfficientLoad(LadesaTypings.Tokens.DiaCalendario.Views.FindOneResult, qb, aliasDiaCalendario, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async diaCalendarioFindById(accessContext: AccessContext, dto: LadesaTypings.DiaCalendarioFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.DiaCalendarioFindOneResult | null> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.aplicarFiltro('dia_calendario:find', qb, aliasDiaCalendario, null);

    // =========================================================

    qb.andWhere(`${aliasDiaCalendario}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DiaCalendario.Views.FindOneResult, qb, aliasDiaCalendario, selection);

    // =========================================================

    const diaCalendario = await qb.getOne();

    // =========================================================

    return diaCalendario;
  }

  async diaCalendarioFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.DiaCalendarioFindOneInput, selection?: string[] | boolean) {
    const diaCalendario = await this.diaCalendarioFindById(accessContext, dto, selection);

    if (!diaCalendario) {
      throw new NotFoundException();
    }

    return diaCalendario;
  }

  async diaCalendarioFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.DiaCalendarioFindOneInput['id'], selection?: string[]): Promise<LadesaTypings.DiaCalendarioFindOneResult | null> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.aplicarFiltro('dia_calendario:find', qb, aliasDiaCalendario, null);

    // =========================================================

    qb.andWhere(`${aliasDiaCalendario}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DiaCalendario.Views.FindOneResult, qb, aliasDiaCalendario, selection);

    // =========================================================

    const diaCalendario = await qb.getOne();

    // =========================================================

    return diaCalendario;
  }

  async DiaCalendarioFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.DiaCalendarioFindOneInput['id'], selection?: string[]) {
    const diaCalendario = await this.diaCalendarioFindByIdSimple(accessContext, id, selection);

    if (!diaCalendario) {
      throw new NotFoundException();
    }

    return diaCalendario;
  }

  //

  async diaCalendarioCreate(accessContext: AccessContext, dto: LadesaTypings.DiaCalendarioCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission('dia_calendario:create', { dto });

    // =========================================================

    const dtoDiaCalendario = pick(dto.body, ['data', 'dia_letivo', 'feriado']);

    const diaCalendario = this.diaCalendarioRepository.create();

    this.diaCalendarioRepository.merge(diaCalendario, {
      ...dtoDiaCalendario,
    });

    // =========================================================

    if (dto.body.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.body.calendario.id);

      this.diaCalendarioRepository.merge(diaCalendario, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.diaCalendarioRepository.save(diaCalendario);

    // =========================================================

    return this.diaCalendarioFindByIdStrict(accessContext, { id: diaCalendario.id });
  }

  async diaCalendarioUpdate(accessContext: AccessContext, dto: LadesaTypings.DiaCalendarioUpdateByIDCombinedInput) {
    // =========================================================

    const currentDiaCalendario = await this.diaCalendarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission('dia_calendario:update', { dto }, dto.params.id, this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario));

    const dtoDiaCalendario = pick(dto.body, ['data', 'dia_letivo', 'feriado']);

    const diaCalendario = {
      id: currentDiaCalendario.id,
    } as DiaCalendarioEntity;

    this.diaCalendarioRepository.merge(diaCalendario, {
      ...dtoDiaCalendario,
    });

    // =========================================================

    if (has(dto.body, 'calendario') && dto.body.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.body.calendario!.id);

      this.diaCalendarioRepository.merge(diaCalendario, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.diaCalendarioRepository.save(diaCalendario);

    // =========================================================

    return this.diaCalendarioFindByIdStrict(accessContext, { id: diaCalendario.id });
  }

  //

  async diaCalendarioDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.DiaCalendarioFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission('dia_calendario:delete', { dto }, dto.id, this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario));

    // =========================================================

    const diaCalendario = await this.diaCalendarioFindByIdStrict(accessContext, dto);

    // =========================================================

    if (diaCalendario) {
      await this.diaCalendarioRepository
        .createQueryBuilder(aliasDiaCalendario)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :diaCalendarioId', { diaCalendarioId: diaCalendario.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
