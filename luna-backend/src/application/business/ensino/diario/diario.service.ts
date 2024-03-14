import { Injectable, NotFoundException } from '@nestjs/common';
import { map, pick } from 'lodash';
import { paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { DiarioEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ensino/diario.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';

// ============================================================================

const aliasDiario = 'diario';

// ============================================================================

export type IDiarioQueryBuilderViewOptions = {};

// ============================================================================

@Injectable()
export class DiarioService {
  constructor(private databaseContext: DatabaseContextService) {}

  get diarioRepository() {
    return this.databaseContext.diarioRepository;
  }

  //

  static DiarioQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, _: IDiarioQueryBuilderViewOptions = {}) {
    qb.addSelect([`${alias}.id`, `${alias}.situacao`, `${alias}.ano`, `${alias}.etapa`, `${alias}.turma`, `${alias}.disciplina`, `${alias}.ambientePadrao`]);
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
        'turma',
        'disciplina',
        'ambientePadrao',
        //
      ],
      sortableColumns: [
        //
        'situacao',
        'ano',
        'etapa',
        'turma',
        'disciplina',
        'ambientePadrao',
      ],
      searchableColumns: [
        //
        'id',
        //
        'situacao',
        'ano',
        'etapa',
        'turma',
        'disciplina',
        'ambientePadrao',
        //
      ],
      defaultSortBy: [],
      filterableColumns: {},
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

    const dtoDiario = pick(dto, ['situacao', 'ano', 'etapa', 'turma', 'disciplina', 'ambientePadrao']);

    const diario = this.diarioRepository.create();

    this.diarioRepository.merge(diario, {
      ...dtoDiario,
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
