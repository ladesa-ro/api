import { Injectable, NotFoundException } from '@nestjs/common';
import * as Spec from '@sisgea/spec';
import { has, map, pick } from 'lodash';
import { paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { DiarioProfessorEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { getPaginateQueryFromSearchInput, getPaginatedResultDto } from '../../../legacy';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta, paginateConfig } from '../../../legacy/utils';
import { IVinculoQueryBuilderViewOptions, VinculoService } from '../../autenticacao/vinculo/vinculo.service';
import { DiarioService, IDiarioQueryBuilderViewOptions } from '../diario/diario.service';

// ============================================================================

const aliasDiarioProfessor = 'diario_professor';

// ============================================================================

export type IDiarioProfessorQueryBuilderViewOptions = {
  loadDiario?: IQueryBuilderViewOptionsLoad<IDiarioQueryBuilderViewOptions>;
  loadvinculo?: IQueryBuilderViewOptionsLoad<IVinculoQueryBuilderViewOptions>;
};

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

  static DiarioProfessorQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IDiarioProfessorQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.situacao`,
    ]);

    const loadDiario = getQueryBuilderViewLoadMeta(options.loadDiario, true, `${alias}_d`);

    if (loadDiario) {
      qb.leftJoin(`${alias}.diario`, `${loadDiario.alias}`);
      DiarioService.DiarioQueryBuilderView(loadDiario.alias, qb, loadDiario.options);
    }

    const loadvinculo = getQueryBuilderViewLoadMeta(options.loadvinculo, true, `${alias}_vp`);

    if (loadvinculo) {
      qb.leftJoin(`${alias}.vinculo`, `${loadvinculo.alias}`);
      VinculoService.VinculoQueryBuilderView(loadvinculo.alias, qb, loadvinculo.options);
    }
  }

  //

  async diarioProfessorFindAll(contextoDeAcesso: IContextoDeAcesso, dto?: Spec.ISearchInputDto): Promise<Spec.IDiarioProfessorFindAllResultDto> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('diario_professor:find', qb, aliasDiarioProfessor, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
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
    DiarioProfessorService.DiarioProfessorQueryBuilderView(aliasDiarioProfessor, qb, {});

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return getPaginatedResultDto(paginated);
  }

  async diarioProfessorFindById(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IDiarioProfessorFindOneByIdInputDto): Promise<Spec.IDiarioProfessorFindOneResultDto | null> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('diario_professor:find', qb, aliasDiarioProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    DiarioProfessorService.DiarioProfessorQueryBuilderView(aliasDiarioProfessor, qb, {});

    // =========================================================

    const diarioProfessor = await qb.getOne();

    // =========================================================

    return diarioProfessor;
  }

  async diarioProfessorFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IDiarioProfessorFindOneByIdInputDto) {
    const diarioProfessor = await this.diarioProfessorFindById(contextoDeAcesso, dto);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  async diarioProfessorFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: Spec.IDiarioProfessorFindOneByIdInputDto['id'],
    options?: IDiarioProfessorQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Spec.IDiarioProfessorFindOneResultDto | null> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('diario_professor:find', qb, aliasDiarioProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    DiarioProfessorService.DiarioProfessorQueryBuilderView(aliasDiarioProfessor, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const diarioProfessor = await qb.getOne();

    // =========================================================

    return diarioProfessor;
  }

  async diarioProfessorFindByIdSimpleStrict(
    contextoDeAcesso: IContextoDeAcesso,
    id: Spec.IDiarioProfessorFindOneByIdInputDto['id'],
    options?: IDiarioProfessorQueryBuilderViewOptions,
    selection?: string[],
  ) {
    const diarioProfessor = await this.diarioProfessorFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  //

  async diarioProfessorCreate(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IDiarioProfessorInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('diario_professor:create', { dto });

    // =========================================================

    const dtoDiarioProfessor = pick(dto, ['situacao']);

    const diarioProfessor = this.diarioProfessorRepository.create();

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(dto, 'diario') && dto.diario !== undefined) {
      if (dto.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(contextoDeAcesso, {
          id: dto.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(dto, 'vinculo') && dto.vinculo !== undefined) {
      if (dto.vinculo !== null) {
        const vinculo = await this.vinculoService.vinculoFindByIdStrict(contextoDeAcesso, {
          id: dto.vinculo.id,
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

    return this.diarioProfessorFindByIdStrict(contextoDeAcesso, { id: diarioProfessor.id });
  }

  async diarioProfessorUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IDiarioProfessorUpdateDto) {
    // =========================================================

    const currentDiarioProfessor = await this.diarioProfessorFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('diario_professor:update', { dto }, dto.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor));

    const dtoDiarioProfessor = pick(dto, ['situacao']);

    const diarioProfessor = {
      id: currentDiarioProfessor.id,
    } as DiarioProfessorEntity;

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(dto, 'diario') && dto.diario !== undefined) {
      if (dto.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(contextoDeAcesso, {
          id: dto.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(dto, 'vinculo') && dto.vinculo !== undefined) {
      if (dto.vinculo !== null) {
        const vinculo = await this.vinculoService.vinculoFindByIdStrict(contextoDeAcesso, {
          id: dto.vinculo.id,
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

    return this.diarioProfessorFindByIdStrict(contextoDeAcesso, { id: diarioProfessor.id });
  }

  //

  async diarioProfessorDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IDiarioProfessorDeleteOneByIdInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('diario_professor:delete', { dto }, dto.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor));

    // =========================================================

    const diarioProfessor = await this.diarioProfessorFindByIdStrict(contextoDeAcesso, dto);

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
