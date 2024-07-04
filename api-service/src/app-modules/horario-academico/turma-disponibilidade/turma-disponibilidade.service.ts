import { AccessContext } from '@/access-context';
import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';
import { DatabaseContextService } from '../../../adapters/adapter-database';
import { QbEfficientLoad } from '../../../app-standards/ladesa-spec/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../app-standards/ladesa-spec/search/search-strategies';
import { paginateConfig } from '../../../fixtures';
import { TurmaService } from '@/app-modules/ensino/turma/turma.service';
import { TurmaDisponibilidadeEntity } from '@/adapters/adapter-database/typeorm/entities';

// ============================================================================

const aliasTurmaDisponibilidade = 'turma_disponibilidade';

// ============================================================================

@Injectable()
export class TurmaDisponibilidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private turmaService: TurmaService,
  ) {}

  get turmaDisponibilidadeRepository() {
    return this.databaseContext.turmaDisponibilidadeRepository;
  }

  //

  async turmaDisponibilidadeFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.TurmaDisponibilidadeListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.TurmaDisponibilidadeListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    await accessContext.aplicarFiltro('turma_disponibilidade:find', qb, aliasTurmaDisponibilidade, null);

    // =========================================================

    const paginated = await LadesaSearch('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'dataInicio',
        'dataFim',
        'turma',
        //
        'turma.id',
        'turma.periodo',
      ],
      sortableColumns: [
        //
        'dataInicio',
        'dataFim',
        //
        'turma.id',
        'turma.periodo',
      ],
      searchableColumns: [
        //
        'id',
        //
        'dataInicio',
        'dataFim',
        'turma',
      ],
      relations: {
        turma: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        'turma.id': [FilterOperator.EQ],
        'turma.periodo': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.TurmaDisponibilidade.Views.FindOneResult, qb, aliasTurmaDisponibilidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async turmaDisponibilidadeFindById(accessContext: AccessContext, dto: LadesaTypings.TurmaDisponibilidadeFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.TurmaDisponibilidadeFindOneResult | null> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    await accessContext.aplicarFiltro('turma_disponibilidade:find', qb, aliasTurmaDisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasTurmaDisponibilidade}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.TurmaDisponibilidade.Views.FindOneResult, qb, aliasTurmaDisponibilidade, selection);
    // =========================================================

    const turmaDisponibilidade = await qb.getOne();

    // =========================================================

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.TurmaDisponibilidadeFindOneInput, selection?: string[] | boolean) {
    const turmaDisponibilidade = await this.turmaDisponibilidadeFindById(accessContext, dto, selection);

    if (!turmaDisponibilidade) {
      throw new NotFoundException();
    }

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.TurmaDisponibilidadeFindOneInput['id'], selection?: string[]): Promise<LadesaTypings.TurmaDisponibilidadeFindOneResult | null> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    await accessContext.aplicarFiltro('turma_disponibilidade:find', qb, aliasTurmaDisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasTurmaDisponibilidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.TurmaDisponibilidade.Views.FindOneResult, qb, aliasTurmaDisponibilidade, selection);

    // =========================================================

    const turmaDisponibilidade = await qb.getOne();

    // =========================================================

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.TurmaDisponibilidadeFindOneInput['id'], selection?: string[]) {
    const turmaDisponibilidade = await this.turmaDisponibilidadeFindByIdSimple(accessContext, id, selection);

    if (!turmaDisponibilidade) {
      throw new NotFoundException();
    }

    return turmaDisponibilidade;
  }

  //

  async turmaDisponibilidadeCreate(accessContext: AccessContext, dto: LadesaTypings.TurmaDisponibilidadeCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission('turma_disponibilidade:create', { dto });

    // =========================================================

    const dtoTurmaDisponibilidade = pick(dto.body, ['dataInicio', 'dataFim',]);

    const turmaDisponibilidade = this.turmaDisponibilidadeRepository.create();

    this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
      ...dtoTurmaDisponibilidade,
    });

    // =========================================================

    if (dto.body.turma) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.body.turma.id);

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        turma: {
          id: turma.id,
        },
      });
    }

    // =========================================================

    await this.turmaDisponibilidadeRepository.save(turmaDisponibilidade);

    // =========================================================

    return this.turmaDisponibilidadeFindByIdStrict(accessContext, { id: turmaDisponibilidade.id });
  }

  async turmaDisponibilidadeUpdate(accessContext: AccessContext, dto: LadesaTypings.TurmaDisponibilidadeUpdateByIDCombinedInput) {
    // =========================================================

    const currentTurmaDisponibilidade = await this.turmaDisponibilidadeFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission('turma_disponibilidade:update', { dto }, dto.params.id, this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade));

    const dtoTurmaDisponibilidade = pick(dto.body, ['dataInicio', 'dataFim']);

    const turmaDisponibilidade = {
      id: currentTurmaDisponibilidade.id,
    } as TurmaDisponibilidadeEntity;

    this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
      ...dtoTurmaDisponibilidade,
    });

    // =========================================================

    if (has(dto.body, 'turma') && dto.body.turma !== undefined) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.body.turma!.id);

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        turma: {
          id: turma.id,
        },
      });
    }

    // =========================================================

    await this.turmaDisponibilidadeRepository.save(turmaDisponibilidade);

    // =========================================================

    return this.turmaDisponibilidadeFindByIdStrict(accessContext, { id: turmaDisponibilidade.id });
  }

  //

  async turmaDisponibilidadeDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.TurmaDisponibilidadeFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission('turma_disponibilidade:delete', { dto }, dto.id, this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade));

    // =========================================================

    const turmaDisponibilidade = await this.turmaDisponibilidadeFindByIdStrict(accessContext, dto);

    // =========================================================

    if (turmaDisponibilidade) {
      await this.turmaDisponibilidadeRepository
        .createQueryBuilder(aliasTurmaDisponibilidade)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :turmaId', { turmaId: turmaDisponibilidade.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
