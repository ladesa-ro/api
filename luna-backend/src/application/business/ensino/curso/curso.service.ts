import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { CursoEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ensino/curso.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { CampusService, ICampusQueryBuilderViewOptions } from '../../ambientes/campus/campus.service';
import { IModalidadeQueryBuilderViewOptions, ModalidadeService } from '../modalidade/modalidade.service';

// ============================================================================

const aliasCurso = 'curso';

// ============================================================================

export type ICursoQueryBuilderViewOptions = {
  loadCampus?: IQueryBuilderViewOptionsLoad<ICampusQueryBuilderViewOptions>;
  loadModalidade?: IQueryBuilderViewOptionsLoad<IModalidadeQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class CursoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private modalidadeService: ModalidadeService,
  ) { }

  get cursoRepository() {
    return this.databaseContext.cursoRepository;
  }

  //

  static CursoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: ICursoQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
      `${alias}.nomeAbreviado`,
    ]);

    const loadCampus = getQueryBuilderViewLoadMeta(options.loadCampus, true, `${alias}_campus`);

    if (loadCampus) {
      qb.innerJoin(`${alias}.campus`, `${loadCampus.alias}`);
      CampusService.CampusQueryBuilderView(loadCampus.alias, qb, loadCampus.options);
    }

    const loadModalidade = getQueryBuilderViewLoadMeta(options.loadModalidade, true, `${alias}_modalidade`);

    if (loadModalidade) {
      qb.innerJoin(`${alias}.modalidade`, `${loadModalidade.alias}`);
      ModalidadeService.ModalidadeQueryBuilderView(loadModalidade.alias, qb, loadModalidade.options);
    }
  }

  //

  async cursoFindAll(clientAccess: IClientAccess, dto?: Dtos.ISearchInputDto): Promise<Dtos.ICursoFindAllResultDto> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    await clientAccess.applyFilter('curso:find', qb, aliasCurso, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        'nomeAbreviado',
        'campus',
        'modalidade',
        //
      ],
      sortableColumns: [
        //
        'nome',
        'nomeAbreviado',
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
        'nomeAbreviado',
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

    CursoService.CursoQueryBuilderView(aliasCurso, qb, {});

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async cursoFindById(clientAccess: IClientAccess, dto: Dtos.ICursoFindOneByIdInputDto): Promise<Dtos.ICursoFindOneResultDto | null> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    await clientAccess.applyFilter('curso:find', qb, aliasCurso, null);

    // =========================================================

    qb.andWhere(`${aliasCurso}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    CursoService.CursoQueryBuilderView(aliasCurso, qb, {});

    // =========================================================

    const curso = await qb.getOne();

    // =========================================================

    return curso;
  }

  async cursoFindByIdStrict(clientAccess: IClientAccess, dto: Dtos.ICursoFindOneByIdInputDto) {
    const curso = await this.cursoFindById(clientAccess, dto);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  async cursoFindByIdSimple(
    clientAccess: IClientAccess,
    id: Dtos.ICursoFindOneByIdInputDto['id'],
    options?: ICursoQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.ICursoFindOneResultDto | null> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    await clientAccess.applyFilter('curso:find', qb, aliasCurso, null);

    // =========================================================

    qb.andWhere(`${aliasCurso}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    CursoService.CursoQueryBuilderView(aliasCurso, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const curso = await qb.getOne();

    // =========================================================

    return curso;
  }

  async cursoFindByIdSimpleStrict(clientAccess: IClientAccess, id: Dtos.ICursoFindOneByIdInputDto['id'], options?: ICursoQueryBuilderViewOptions, selection?: string[]) {
    const curso = await this.cursoFindByIdSimple(clientAccess, id, options, selection);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  //

  async cursoCreate(clientAccess: IClientAccess, dto: Dtos.ICursoInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('curso:create', { dto });

    // =========================================================

    const dtoCurso = pick(dto, ['nome', 'nomeAbreviado']);

    const curso = this.cursoRepository.create();

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(clientAccess, dto.campus.id);

    this.cursoRepository.merge(curso, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(clientAccess, dto.modalidade.id);

    this.cursoRepository.merge(curso, {
      modalidade: {
        id: modalidade.id,
      },
    });

    // =========================================================

    await this.cursoRepository.save(curso);

    // =========================================================

    return this.cursoFindByIdStrict(clientAccess, { id: curso.id });
  }

  async cursoUpdate(clientAccess: IClientAccess, dto: Dtos.ICursoUpdateDto) {
    // =========================================================

    const currentCurso = await this.cursoFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    // =========================================================

    await clientAccess.ensureCanReach('curso:update', { dto }, this.cursoRepository.createQueryBuilder(aliasCurso), dto.id);

    const dtoCurso = pick(dto, ['nome', 'nomeAbreviado', 'campus', 'modalidade']);

    const curso = <CursoEntity>{
      id: currentCurso.id,
    };

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    // =========================================================

    if (has(dto, 'campus') && dto.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(clientAccess, dto.campus.id);

      this.cursoRepository.merge(curso, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (has(dto, 'modalidade') && dto.modalidade !== undefined) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(clientAccess, dto.modalidade.id);

      this.cursoRepository.merge(curso, {
        modalidade: {
          id: modalidade.id,
        },
      });
    }

    // =========================================================

    await this.cursoRepository.save(curso);

    // =========================================================

    return this.cursoFindByIdStrict(clientAccess, { id: curso.id });
  }

  //

  async cursoDeleteOneById(clientAccess: IClientAccess, dto: Dtos.ICursoDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('curso:delete', { dto }, this.cursoRepository.createQueryBuilder(aliasCurso), dto.id);

    // =========================================================

    const curso = await this.cursoFindByIdStrict(clientAccess, dto);

    // =========================================================

    if (curso) {
      await this.cursoRepository
        .createQueryBuilder(aliasCurso)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :cursoId', { cursoId: curso.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
