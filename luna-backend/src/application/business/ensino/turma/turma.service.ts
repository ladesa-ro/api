import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { TurmaEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ensino/turma.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { AmbienteService, IAmbienteQueryBuilderViewOptions } from '../../ambientes/ambiente/ambiente.service';
import { CursoService, ICursoQueryBuilderViewOptions } from '../curso/curso.service';

// ============================================================================

const aliasTurma = 'turma';

// ============================================================================

export type ITurmaQueryBuilderViewOptions = {
  loadCurso?: IQueryBuilderViewOptionsLoad<ICursoQueryBuilderViewOptions>;
  loadAmbientePadraoAula?: IQueryBuilderViewOptionsLoad<IAmbienteQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class TurmaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private ambienteService: AmbienteService,
    private cursoService: CursoService,
  ) {}

  get turmaRepository() {
    return this.databaseContext.turmaRepository;
  }

  //

  static TurmaQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: ITurmaQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.periodo`,
      `${alias}.grupo`,
      `${alias}.nome`,
    ]);

    const loadCurso = getQueryBuilderViewLoadMeta(options.loadCurso, true, `${alias}_curso`);

    if (loadCurso) {
      qb.innerJoin(`${alias}.curso`, `${loadCurso.alias}`);
      CursoService.CursoQueryBuilderView(loadCurso.alias, qb, loadCurso.options);
    }

    const loadAmbientePadraoAula = getQueryBuilderViewLoadMeta(options.loadAmbientePadraoAula, true, `${alias}_ambientePadraoAula`);

    if (loadAmbientePadraoAula) {
      qb.leftJoin(`${alias}.ambientePadraoAula`, `${loadAmbientePadraoAula.alias}`);
      AmbienteService.AmbienteQueryBuilderView(loadAmbientePadraoAula.alias, qb, loadAmbientePadraoAula.options);
    }
  }

  //

  async turmaFindAll(clientAccess: IClientAccess, dto?: Dtos.ISearchInputDto): Promise<Dtos.ITurmaFindAllResultDto> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    await clientAccess.applyFilter('turma:find', qb, aliasTurma, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'periodo',
        'grupo',
        'nome',

        //
      ],
      sortableColumns: [
        //
        'periodo',
        'grupo',
        'nome',
        //
        'ambientePadraoAula.nome',
        'ambientePadraoAula.descricao',
        'ambientePadraoAula.codigo',
        'ambientePadraoAula.capacidade',
        'ambientePadraoAula.tipo',
        //
        'curso.nome',
        'curso.nomeAbreviado',
        'curso.campus.id',
        'curso.modalidade.id',
        'curso.modalidade.nome',
      ],
      relations: {
        curso: {
          campus: true,
        },
        ambientePadraoAula: true,
      },
      searchableColumns: [
        //
        'id',
        //
        'periodo',
        'grupo',
        'nome',
        //
      ],
      defaultSortBy: [],
      filterableColumns: {
        //
        'ambientePadraoAula.nome': [FilterOperator.EQ],
        'ambientePadraoAula.codigo': [FilterOperator.EQ],
        'ambientePadraoAula.capacidade': [FilterOperator.EQ, FilterOperator.GT, FilterOperator.GTE, FilterOperator.LT, FilterOperator.LTE],
        'ambientePadraoAula.tipo': [FilterOperator.EQ],
        //
        'curso.nome': [FilterOperator.EQ],
        'curso.nomeAbreviado': [FilterOperator.EQ],
        'curso.campus.id': [FilterOperator.EQ],
        'curso.modalidade.id': [FilterOperator.EQ],
        'curso.modalidade.nome': [FilterOperator.EQ],
        'curso.modalidade.slug': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    TurmaService.TurmaQueryBuilderView(aliasTurma, qb, {});

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async turmaFindById(clientAccess: IClientAccess, dto: Dtos.ITurmaFindOneByIdInputDto): Promise<Dtos.ITurmaFindOneResultDto | null> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    await clientAccess.applyFilter('turma:find', qb, aliasTurma, null);

    // =========================================================

    qb.andWhere(`${aliasTurma}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    TurmaService.TurmaQueryBuilderView(aliasTurma, qb, {});

    // =========================================================

    const turma = await qb.getOne();

    // =========================================================

    return turma;
  }

  async turmaFindByIdStrict(clientAccess: IClientAccess, dto: Dtos.ITurmaFindOneByIdInputDto) {
    const turma = await this.turmaFindById(clientAccess, dto);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  async turmaFindByIdSimple(
    clientAccess: IClientAccess,
    id: Dtos.ITurmaFindOneByIdInputDto['id'],
    options?: ITurmaQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.ITurmaFindOneResultDto | null> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    await clientAccess.applyFilter('turma:find', qb, aliasTurma, null);

    // =========================================================

    qb.andWhere(`${aliasTurma}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    TurmaService.TurmaQueryBuilderView(aliasTurma, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const turma = await qb.getOne();

    // =========================================================

    return turma;
  }

  async turmaFindByIdSimpleStrict(clientAccess: IClientAccess, id: Dtos.ITurmaFindOneByIdInputDto['id'], options?: ITurmaQueryBuilderViewOptions, selection?: string[]) {
    const turma = await this.turmaFindByIdSimple(clientAccess, id, options, selection);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  //

  async turmaCreate(clientAccess: IClientAccess, dto: Dtos.ITurmaInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('turma:create', { dto });

    // =========================================================

    const dtoTurma = pick(dto, ['periodo', 'grupo', 'nome']);

    const turma = this.turmaRepository.create();

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    // =========================================================

    if (dto.ambientePadraoAula !== null) {
      const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(clientAccess, { id: dto.ambientePadraoAula.id });

      this.turmaRepository.merge(turma, {
        ambientePadraoAula: {
          id: ambientePadraoAula.id,
        },
      });
    } else {
      this.turmaRepository.merge(turma, {
        ambientePadraoAula: null,
      });
    }

    // =========================================================

    const curso = await this.cursoService.cursoFindByIdSimpleStrict(clientAccess, dto.curso.id);

    this.turmaRepository.merge(turma, {
      curso: {
        id: curso.id,
      },
    });

    // =========================================================

    await this.turmaRepository.save(turma);

    // =========================================================

    return this.turmaFindByIdStrict(clientAccess, { id: turma.id });
  }

  async turmaUpdate(clientAccess: IClientAccess, dto: Dtos.ITurmaUpdateDto) {
    // =========================================================

    const currentTurma = await this.turmaFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    // =========================================================

    await clientAccess.ensureCanReach('turma:update', { dto }, this.turmaRepository.createQueryBuilder(aliasTurma), dto.id);

    const dtoTurma = pick(dto, ['periodo', 'grupo', 'nome']);

    const turma = <TurmaEntity>{
      id: currentTurma.id,
    };

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    // =========================================================

    if (has(dto, 'ambientePadraoAula') && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(clientAccess, { id: dto.ambientePadraoAula.id });

        this.turmaRepository.merge(turma, {
          ambientePadraoAula: {
            id: ambientePadraoAula.id,
          },
        });
      } else {
        this.turmaRepository.merge(turma, {
          ambientePadraoAula: null,
        });
      }
    }

    // =========================================================

    if (has(dto, 'curso') && dto.curso !== undefined) {
      const curso = await this.cursoService.cursoFindByIdSimpleStrict(clientAccess, dto.curso.id);

      this.turmaRepository.merge(turma, {
        curso: {
          id: curso.id,
        },
      });
    }

    // =========================================================

    await this.turmaRepository.save(turma);

    // =========================================================

    return this.turmaFindByIdStrict(clientAccess, { id: turma.id });
  }

  //

  async turmaDeleteOneById(clientAccess: IClientAccess, dto: Dtos.ITurmaDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('turma:delete', { dto }, this.turmaRepository.createQueryBuilder(aliasTurma), dto.id);

    // =========================================================

    const turma = await this.turmaFindByIdStrict(clientAccess, dto);

    // =========================================================

    if (turma) {
      await this.turmaRepository
        .createQueryBuilder(aliasTurma)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :turmaId', { turmaId: turma.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
