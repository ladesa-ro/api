import { Injectable, NotFoundException } from '@nestjs/common';
import { map, pick } from 'lodash';
import { paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { DisciplinaEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ensino/disciplina.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';

// ============================================================================

const aliasDisciplina = 'disciplina';

// ============================================================================

export type IDisciplinaQueryBuilderViewOptions = {};

// ============================================================================

@Injectable()
export class DisciplinaService {
  constructor(private databaseContext: DatabaseContextService) {}

  get disciplinaRepository() {
    return this.databaseContext.disciplinaRepository;
  }

  //

  static DisciplinaQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, _: IDisciplinaQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
      `${alias}.cargaHoraria`,
    ]);
  }

  //

  async disciplinaFindAll(clientAccess: IClientAccess, dto?: Dtos.ISearchInputDto): Promise<Dtos.IDisciplinaFindAllResultDto> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await clientAccess.applyFilter('disciplina:find', qb, aliasDisciplina, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        'cargaHoraria',
        //
      ],
      sortableColumns: [
        //
        'nome',
        'cargaHoraria',
      ],
      searchableColumns: [
        //
        'id',
        //
        'nome',
        'cargaHoraria',
        //
      ],
      defaultSortBy: [],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);

    DisciplinaService.DisciplinaQueryBuilderView(aliasDisciplina, qb, {});

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async disciplinaFindById(clientAccess: IClientAccess, dto: Dtos.IDisciplinaFindOneByIdInputDto): Promise<Dtos.IDisciplinaFindOneResultDto | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await clientAccess.applyFilter('disciplina:find', qb, aliasDisciplina, null);

    // =========================================================

    qb.andWhere(`${aliasDisciplina}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    DisciplinaService.DisciplinaQueryBuilderView(aliasDisciplina, qb, {});

    // =========================================================

    const disciplina = await qb.getOne();

    // =========================================================

    return disciplina;
  }

  async disciplinaFindByIdStrict(clientAccess: IClientAccess, dto: Dtos.IDisciplinaFindOneByIdInputDto) {
    const disciplina = await this.disciplinaFindById(clientAccess, dto);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  async disciplinaFindByIdSimple(
    clientAccess: IClientAccess,
    id: Dtos.IDisciplinaFindOneByIdInputDto['id'],
    options?: IDisciplinaQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.IDisciplinaFindOneResultDto | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await clientAccess.applyFilter('disciplina:find', qb, aliasDisciplina, null);

    // =========================================================

    qb.andWhere(`${aliasDisciplina}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    DisciplinaService.DisciplinaQueryBuilderView(aliasDisciplina, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const disciplina = await qb.getOne();

    // =========================================================

    return disciplina;
  }

  async disciplinaFindByIdSimpleStrict(clientAccess: IClientAccess, id: Dtos.IDisciplinaFindOneByIdInputDto['id'], options?: IDisciplinaQueryBuilderViewOptions, selection?: string[]) {
    const disciplina = await this.disciplinaFindByIdSimple(clientAccess, id, options, selection);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  //

  async disciplinaCreate(clientAccess: IClientAccess, dto: Dtos.IDisciplinaInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('disciplina:create', { dto });

    // =========================================================

    const dtoDisciplina = pick(dto, ['nome', 'cargaHoraria']);

    const disciplina = this.disciplinaRepository.create();

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    // =========================================================

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return this.disciplinaFindByIdStrict(clientAccess, { id: disciplina.id });
  }

  async disciplinaUpdate(clientAccess: IClientAccess, dto: Dtos.IDisciplinaUpdateDto) {
    // =========================================================

    const currentDisciplina = await this.disciplinaFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    // =========================================================

    await clientAccess.ensureCanReach('disciplina:update', { dto }, this.disciplinaRepository.createQueryBuilder(aliasDisciplina), dto.id);

    const dtoDisciplina = pick(dto, ['nome', 'cargaHoraria']);

    const disciplina = <DisciplinaEntity>{
      id: currentDisciplina.id,
    };

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    // =========================================================

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return this.disciplinaFindByIdStrict(clientAccess, { id: disciplina.id });
  }

  //

  async disciplinaDeleteOneById(clientAccess: IClientAccess, dto: Dtos.IDisciplinaDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('disciplina:delete', { dto }, this.disciplinaRepository.createQueryBuilder(aliasDisciplina), dto.id);

    // =========================================================

    const disciplina = await this.disciplinaFindByIdStrict(clientAccess, dto);

    // =========================================================

    if (disciplina) {
      await this.disciplinaRepository
        .createQueryBuilder(aliasDisciplina)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :disciplinaId', { disciplinaId: disciplina.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
