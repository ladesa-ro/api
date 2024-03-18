import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { DiarioEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ensino/diario.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { AmbienteService, IAmbienteQueryBuilderViewOptions } from '../../ambientes/ambiente/ambiente.service';
import { DisciplinaService, IDisciplinaQueryBuilderViewOptions } from '../disciplina/disciplina.service';
import { ITurmaQueryBuilderViewOptions, TurmaService } from '../turma/turma.service';

// ============================================================================

const aliasDiario = 'diario';

// ============================================================================

export type IDiarioQueryBuilderViewOptions = {
  loadTurma?: IQueryBuilderViewOptionsLoad<ITurmaQueryBuilderViewOptions>;
  loadDisciplina?: IQueryBuilderViewOptionsLoad<IDisciplinaQueryBuilderViewOptions>;
  loadAmbientePadrao?: IQueryBuilderViewOptionsLoad<IAmbienteQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class DiarioService {
  constructor(
    private databaseContext: DatabaseContextService,
    private turmaService: TurmaService,
    private disciplinaService: DisciplinaService,
    private ambienteService: AmbienteService,
  ) {}

  get diarioRepository() {
    return this.databaseContext.diarioRepository;
  }

  //

  static DiarioQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IDiarioQueryBuilderViewOptions = {}) {
    qb.addSelect([`${alias}.id`, `${alias}.situacao`, `${alias}.ano`, `${alias}.etapa`]);

    const loadAmbientePadrao = getQueryBuilderViewLoadMeta(options.loadAmbientePadrao, true, `${alias}_ambientePadrao`);

    if (loadAmbientePadrao) {
      qb.leftJoin(`${alias}.ambientePadrao`, `${loadAmbientePadrao.alias}`);
      AmbienteService.AmbienteQueryBuilderView(loadAmbientePadrao.alias, qb, loadAmbientePadrao.options);
    }

    const loadDisciplina = getQueryBuilderViewLoadMeta(options.loadDisciplina, true, `${alias}_disciplina`);

    if (loadDisciplina) {
      qb.leftJoin(`${alias}.disciplina`, `${loadDisciplina.alias}`);
      DisciplinaService.DisciplinaQueryBuilderView(loadDisciplina.alias, qb, loadDisciplina.options);
    }

    const loadTurma = getQueryBuilderViewLoadMeta(options.loadTurma, true, `${alias}_turma`);

    if (loadTurma) {
      qb.leftJoin(`${alias}.turma`, `${loadTurma.alias}`);
      TurmaService.TurmaQueryBuilderView(loadTurma.alias, qb, loadTurma.options);
    }
  }

  //

  async diarioFindAll(clientAccess: IClientAccess, dto?: Dtos.ISearchInputDto): Promise<Dtos.IDiarioFindAllResultDto> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await clientAccess.applyFilter('diario:find', qb, aliasDiario, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'situacao',
        'ano',
        'etapa',
        //
        'turma.id',
        'turma.nome',
        'turma.grupo',
        'turma.periodo',
        'disciplina.id',
        'disciplina.nome',
        'ambientePadrao.id',
        'ambientePadrao.nome',
        //
      ],
      sortableColumns: [
        //
        'situacao',
        'ano',
        'etapa',
        //
        'turma.nome',
        'disciplina.nome',
        'ambientePadrao.nome',
      ],
      relations: {
        turma: true,
        disciplina: true,
        ambientePadrao: true,
      },
      searchableColumns: [
        //
        'id',
        //
        'situacao',
        'ano',
        'etapa',
        'turma.periodo',
        'turma.grupo',
        'turma.nome',
        'disciplina.nome',
        //
      ],
      defaultSortBy: [],
      filterableColumns: {
        'turma.id': [FilterOperator.EQ],
        'disciplina.id': [FilterOperator.EQ],
        'ambientePadrao.id': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    DiarioService.DiarioQueryBuilderView(aliasDiario, qb, {});

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async diarioFindById(clientAccess: IClientAccess, dto: Dtos.IDiarioFindOneByIdInputDto): Promise<Dtos.IDiarioFindOneResultDto | null> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await clientAccess.applyFilter('diario:find', qb, aliasDiario, null);

    // =========================================================

    qb.andWhere(`${aliasDiario}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    DiarioService.DiarioQueryBuilderView(aliasDiario, qb, {});

    // =========================================================

    const diario = await qb.getOne();

    // =========================================================

    return diario;
  }

  async diarioFindByIdStrict(clientAccess: IClientAccess, dto: Dtos.IDiarioFindOneByIdInputDto) {
    const diario = await this.diarioFindById(clientAccess, dto);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  async diarioFindByIdSimple(
    clientAccess: IClientAccess,
    id: Dtos.IDiarioFindOneByIdInputDto['id'],
    options?: IDiarioQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.IDiarioFindOneResultDto | null> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await clientAccess.applyFilter('diario:find', qb, aliasDiario, null);

    // =========================================================

    qb.andWhere(`${aliasDiario}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    DiarioService.DiarioQueryBuilderView(aliasDiario, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const diario = await qb.getOne();

    // =========================================================

    return diario;
  }

  async diarioFindByIdSimpleStrict(clientAccess: IClientAccess, id: Dtos.IDiarioFindOneByIdInputDto['id'], options?: IDiarioQueryBuilderViewOptions, selection?: string[]) {
    const diario = await this.diarioFindByIdSimple(clientAccess, id, options, selection);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  //

  async diarioCreate(clientAccess: IClientAccess, dto: Dtos.IDiarioInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('diario:create', { dto });

    // =========================================================

    const dtoDiario = pick(dto, ['situacao', 'ano', 'etapa']);

    const diario = this.diarioRepository.create();

    this.diarioRepository.merge(diario, {
      ...dtoDiario,
    });

    // =========================================================

    if (dto.ambientePadrao !== null) {
      const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(clientAccess, { id: dto.ambientePadrao.id });

      this.diarioRepository.merge(diario, {
        ambientePadrao: {
          id: ambientePadrao.id,
        },
      });
    } else {
      this.diarioRepository.merge(diario, {
        ambientePadrao: null,
      });
    }

    // =========================================================

    const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(clientAccess, dto.disciplina.id);

    this.diarioRepository.merge(diario, {
      disciplina: {
        id: disciplina.id,
      },
    });

    // =========================================================

    const turma = await this.turmaService.turmaFindByIdSimpleStrict(clientAccess, dto.turma.id);

    this.diarioRepository.merge(diario, {
      turma: {
        id: turma.id,
      },
    });

    // =========================================================

    await this.diarioRepository.save(diario);

    // =========================================================

    return this.diarioFindByIdStrict(clientAccess, { id: diario.id });
  }

  async diarioUpdate(clientAccess: IClientAccess, dto: Dtos.IDiarioUpdateDto) {
    // =========================================================

    const currentDiario = await this.diarioFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    // =========================================================

    await clientAccess.ensureCanReach('diario:update', { dto }, this.diarioRepository.createQueryBuilder(aliasDiario), dto.id);

    const dtoDiario = pick(dto, ['situacao', 'ano', 'etapa', 'turma', 'disciplina', 'ambientePadrao']);

    const diario = <DiarioEntity>{
      id: currentDiario.id,
    };

    this.diarioRepository.merge(diario, {
      ...dtoDiario,
    });

    // =========================================================

    if (has(dto, 'ambientePadrao') && dto.ambientePadrao !== undefined) {
      if (dto.ambientePadrao !== null) {
        const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(clientAccess, { id: dto.ambientePadrao.id });

        this.diarioRepository.merge(diario, {
          ambientePadrao: {
            id: ambientePadrao.id,
          },
        });
      } else {
        this.diarioRepository.merge(diario, {
          ambientePadrao: null,
        });
      }
    }

    // =========================================================

    if (has(dto, 'disciplina') && dto.disciplina !== undefined) {
      const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(clientAccess, dto.disciplina.id);

      this.diarioRepository.merge(diario, {
        disciplina: {
          id: disciplina.id,
        },
      });
    }

    // =========================================================

    if (has(dto, 'turma') && dto.turma !== undefined) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(clientAccess, dto.turma.id);

      this.diarioRepository.merge(diario, {
        turma: {
          id: turma.id,
        },
      });
    }

    // =========================================================

    await this.diarioRepository.save(diario);

    // =========================================================

    return this.diarioFindByIdStrict(clientAccess, { id: diario.id });
  }

  //

  async diarioDeleteOneById(clientAccess: IClientAccess, dto: Dtos.IDiarioDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('diario:delete', { dto }, this.diarioRepository.createQueryBuilder(aliasDiario), dto.id);

    // =========================================================

    const diario = await this.diarioFindByIdStrict(clientAccess, dto);

    // =========================================================

    if (diario) {
      await this.diarioRepository
        .createQueryBuilder(aliasDiario)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :diarioId', { diarioId: diario.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
