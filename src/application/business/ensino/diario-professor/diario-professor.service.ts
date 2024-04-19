import { Injectable, NotFoundException } from '@nestjs/common';
import * as Dtos from '@sisgea/spec';
import { has, map, pick } from 'lodash';
import { paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { DiarioProfessorEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ensino/diario_professor.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { IUsuarioVinculoCampusQueryBuilderViewOptions, UsuarioVinculoCampusService } from '../../autenticacao/usuario-vinculo-campus/usuario-vinculo-campus.service';
import { DiarioService, IDiarioQueryBuilderViewOptions } from '../diario/diario.service';

// ============================================================================

const aliasDiarioProfessor = 'diario_professor';

// ============================================================================

export type IDiarioProfessorQueryBuilderViewOptions = {
  loadDiario?: IQueryBuilderViewOptionsLoad<IDiarioQueryBuilderViewOptions>;
  loadVinculoProfessor?: IQueryBuilderViewOptionsLoad<IUsuarioVinculoCampusQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class DiarioProfessorService {
  constructor(
    private diarioService: DiarioService,
    private usuarioVinculoCampusService: UsuarioVinculoCampusService,
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

    const loadVinculoProfessor = getQueryBuilderViewLoadMeta(options.loadVinculoProfessor, true, `${alias}_vp`);

    if (loadVinculoProfessor) {
      qb.leftJoin(`${alias}.vinculoProfessor`, `${loadVinculoProfessor.alias}`);
      UsuarioVinculoCampusService.UsuarioVinculoCampusQueryBuilderView(loadVinculoProfessor.alias, qb, loadVinculoProfessor.options);
    }
  }

  //

  async diarioProfessorFindAll(contextoDeAcesso: IContextoDeAcesso, dto?: Dtos.ISearchInputDto): Promise<Dtos.IDiarioProfessorFindAllResultDto> {
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
        'vinculoProfessor.id',
        'vinculoProfessor.campus.id',
        'vinculoProfessor.usuario.id',
        //
      ],
      relations: {
        diario: true,
        vinculoProfessor: {
          campus: true,
          usuario: true,
        },
      },
      sortableColumns: [
        //
        'situacao',
        'diario.id',
        'vinculoProfessor.campus.id',
        'vinculoProfessor.usuario.id',
      ],
      searchableColumns: [
        //
        'id',
        //
        'situacao',
        'diario.id',
        'vinculoProfessor.campus.id',
        'vinculoProfessor.usuario.id',
        //
      ],
      defaultSortBy: [],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    DiarioProfessorService.DiarioProfessorQueryBuilderView(aliasDiarioProfessor, qb, {});

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async diarioProfessorFindById(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IDiarioProfessorFindOneByIdInputDto): Promise<Dtos.IDiarioProfessorFindOneResultDto | null> {
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

  async diarioProfessorFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IDiarioProfessorFindOneByIdInputDto) {
    const diarioProfessor = await this.diarioProfessorFindById(contextoDeAcesso, dto);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  async diarioProfessorFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: Dtos.IDiarioProfessorFindOneByIdInputDto['id'],
    options?: IDiarioProfessorQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.IDiarioProfessorFindOneResultDto | null> {
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
    id: Dtos.IDiarioProfessorFindOneByIdInputDto['id'],
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

  async diarioProfessorCreate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IDiarioProfessorInputDto) {
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

    if (has(dto, 'vinculoProfessor') && dto.vinculoProfessor !== undefined) {
      if (dto.vinculoProfessor !== null) {
        const vinculoProfessor = await this.usuarioVinculoCampusService.vinculoFindByIdStrict(contextoDeAcesso, {
          id: dto.vinculoProfessor.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          vinculoProfessor: {
            id: vinculoProfessor.id,
          },
        });
      }
    }

    // =========================================================

    await this.diarioProfessorRepository.save(diarioProfessor);

    // =========================================================

    return this.diarioProfessorFindByIdStrict(contextoDeAcesso, { id: diarioProfessor.id });
  }

  async diarioProfessorUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IDiarioProfessorUpdateDto) {
    // =========================================================

    const currentDiarioProfessor = await this.diarioProfessorFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('diario_professor:update', { dto }, dto.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor));

    const dtoDiarioProfessor = pick(dto, ['situacao']);

    const diarioProfessor = <DiarioProfessorEntity>{
      id: currentDiarioProfessor.id,
    };

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

    if (has(dto, 'vinculoProfessor') && dto.vinculoProfessor !== undefined) {
      if (dto.vinculoProfessor !== null) {
        const vinculoProfessor = await this.usuarioVinculoCampusService.vinculoFindByIdStrict(contextoDeAcesso, {
          id: dto.vinculoProfessor.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          vinculoProfessor: {
            id: vinculoProfessor.id,
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

  async diarioProfessorDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IDiarioProfessorDeleteOneByIdInputDto) {
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
