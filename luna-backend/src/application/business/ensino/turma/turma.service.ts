import { Injectable, NotFoundException } from '@nestjs/common';
import { map, pick } from 'lodash';
import { paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { TurmaEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ensino/turma.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';

// ============================================================================

const aliasTurma = 'turma';

// ============================================================================

export type ITurmaQueryBuilderViewOptions = {};

// ============================================================================

@Injectable()
export class TurmaService {
  constructor(private databaseContext: DatabaseContextService) {}

  get turmaRepository() {
    return this.databaseContext.turmaRepository;
  }

  //

  static TurmaQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, _: ITurmaQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.periodo`,
      `${alias}.grupo`,
      `${alias}.nome`,
      `${alias}.ambientePadraoAula`,
      `${alias}.curso`,
    ]);
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
        'ambientePadraoAula',
        'curso',
        //
      ],
      sortableColumns: [
        //
        'periodo',
        'grupo',
        'nome',
        'ambientePadraoAula',
        'curso',
      ],
      searchableColumns: [
        //
        'id',
        //
        'periodo',
        'grupo',
        'nome',
        'ambientePadraoAula',
        'curso',
        //
      ],
      defaultSortBy: [],
      filterableColumns: {},
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

    const dtoTurma = pick(dto, ['periodo', 'grupo', 'nome', 'ambientePadraoAula', 'curso']);

    const turma = this.turmaRepository.create();

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
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

    const dtoTurma = pick(dto, ['periodo', 'grupo', 'nome', 'ambientePadraoAula', 'curso']);

    const turma = <TurmaEntity>{
      id: currentTurma.id,
    };

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

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
