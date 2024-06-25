import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { AccessContext } from '../../../access-context';
import { DatabaseContextService } from '../../../adapters/adapter-database';
import { DiarioProfessorEntity } from '../../../adapters/adapter-database/typeorm/entities';
import { paginateConfig } from '../../../fixtures';
import { QbEfficientLoad } from '../../../fixtures/ladesa-spec/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../fixtures/ladesa-spec/search/search-strategies';
import { VinculoService } from '../../autenticacao/vinculo/vinculo.service';
import { DiarioService } from '../diario/diario.service';

// ============================================================================

const aliasDiarioProfessor = 'diario_professor';

// ============================================================================

@Injectable()
export class DiarioProfessorService {
  constructor(
    private diarioService: DiarioService,
    private vinculoService: VinculoService,
    private databaseContext: DatabaseContextService,
  ) {}

  get diarioProfessorRepository() {
    return this.databaseContext.diarioProfessorRepository;
  }

  //

  async diarioProfessorFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.DiarioProfessorListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DiarioProfessorListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.aplicarFiltro('diario_professor:find', qb, aliasDiarioProfessor, null);

    // =========================================================

    const paginated = await LadesaSearch('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'situacao',
        //
        'diario.id',
        //
        'vinculo.id',
        'vinculo.campus.id',
        'vinculo.usuario.id',
        //
      ],
      relations: {
        diario: true,
        vinculo: {
          campus: true,
          usuario: true,
        },
      },
      sortableColumns: [
        //
        'situacao',
        'diario.id',
        'vinculo.campus.id',
        'vinculo.usuario.id',
      ],
      searchableColumns: [
        //
        'id',
        //
        'situacao',
        'diario.id',
        'vinculo.campus.id',
        'vinculo.usuario.id',
        //
      ],
      defaultSortBy: [],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DiarioProfessor.Views.FindOneResult, qb, aliasDiarioProfessor, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async diarioProfessorFindById(
    accessContext: AccessContext,
    dto: LadesaTypings.DiarioProfessorFindOneInput,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DiarioProfessorFindOneResult | null> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.aplicarFiltro('diario_professor:find', qb, aliasDiarioProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DiarioProfessor.Views.FindOneResult, qb, aliasDiarioProfessor, selection);

    // =========================================================

    const diarioProfessor = await qb.getOne();

    // =========================================================

    return diarioProfessor;
  }

  async diarioProfessorFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.DiarioProfessorFindOneInput, selection?: string[] | boolean) {
    const diarioProfessor = await this.diarioProfessorFindById(accessContext, dto, selection);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  async diarioProfessorFindByIdSimple(
    accessContext: AccessContext,
    id: LadesaTypings.DiarioProfessorFindOneInput['id'],
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DiarioProfessorFindOneResult | null> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.aplicarFiltro('diario_professor:find', qb, aliasDiarioProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DiarioProfessor.Views.FindOneResult, qb, aliasDiarioProfessor, selection);

    // =========================================================

    const diarioProfessor = await qb.getOne();

    // =========================================================

    return diarioProfessor;
  }

  async diarioProfessorFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.DiarioProfessorFindOneInput['id'], selection?: string[] | boolean) {
    const diarioProfessor = await this.diarioProfessorFindByIdSimple(accessContext, id, selection);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  //

  async diarioProfessorCreate(accessContext: AccessContext, dto: LadesaTypings.DiarioProfessorCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission('diario_professor:create', { dto });

    // =========================================================

    const dtoDiarioProfessor = pick(dto.body, ['situacao']);

    const diarioProfessor = this.diarioProfessorRepository.create();

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(dto.body, 'diario') && dto.body.diario !== undefined) {
      if (dto.body.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: dto.body.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(dto.body, 'vinculo') && dto.body.vinculo !== undefined) {
      if (dto.body.vinculo !== null) {
        const vinculo = await this.vinculoService.vinculoFindByIdStrict(accessContext, {
          id: dto.body.vinculo.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          vinculo: {
            id: vinculo.id,
          },
        });
      }
    }

    // =========================================================

    await this.diarioProfessorRepository.save(diarioProfessor);

    // =========================================================

    return this.diarioProfessorFindByIdStrict(accessContext, { id: diarioProfessor.id });
  }

  async diarioProfessorUpdate(accessContext: AccessContext, dto: LadesaTypings.DiarioProfessorUpdateByIDCombinedInput) {
    // =========================================================

    const currentDiarioProfessor = await this.diarioProfessorFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission('diario_professor:update', { dto }, dto.params.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor));

    const dtoDiarioProfessor = pick(dto.body, ['situacao']);

    const diarioProfessor = {
      id: currentDiarioProfessor.id,
    } as DiarioProfessorEntity;

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(dto.body, 'diario') && dto.body.diario !== undefined) {
      if (dto.body.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: dto.body.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(dto.body, 'vinculo') && dto.body.vinculo !== undefined) {
      if (dto.body.vinculo !== null) {
        const vinculo = await this.vinculoService.vinculoFindByIdStrict(accessContext, {
          id: dto.body.vinculo.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          vinculo: {
            id: vinculo.id,
          },
        });
      }
    }

    // =========================================================

    await this.diarioProfessorRepository.save(diarioProfessor);

    // =========================================================

    return this.diarioProfessorFindByIdStrict(accessContext, { id: diarioProfessor.id });
  }

  //

  async diarioProfessorDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.DiarioProfessorFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission('diario_professor:delete', { dto }, dto.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor));

    // =========================================================

    const diarioProfessor = await this.diarioProfessorFindByIdStrict(accessContext, dto);

    // =========================================================

    if (diarioProfessor) {
      await this.diarioProfessorRepository
        .createQueryBuilder(aliasDiarioProfessor)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :diarioProfessorId', { diarioProfessorId: diarioProfessor.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
