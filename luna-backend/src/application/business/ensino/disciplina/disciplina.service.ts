import { Injectable, NotFoundException } from '@nestjs/common';
import { map, pick } from 'lodash';
import { paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
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

  async disciplinaFindAll(contextoDeAcesso: IContextoDeAcesso, dto?: Dtos.ISearchInputDto): Promise<Dtos.IDisciplinaFindAllResultDto> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('disciplina:find', qb, aliasDisciplina, null);

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

  async disciplinaFindById(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IDisciplinaFindOneByIdInputDto): Promise<Dtos.IDisciplinaFindOneResultDto | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('disciplina:find', qb, aliasDisciplina, null);

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

  async disciplinaFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IDisciplinaFindOneByIdInputDto) {
    const disciplina = await this.disciplinaFindById(contextoDeAcesso, dto);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  async disciplinaFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: Dtos.IDisciplinaFindOneByIdInputDto['id'],
    options?: IDisciplinaQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.IDisciplinaFindOneResultDto | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('disciplina:find', qb, aliasDisciplina, null);

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

  async disciplinaFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: Dtos.IDisciplinaFindOneByIdInputDto['id'], options?: IDisciplinaQueryBuilderViewOptions, selection?: string[]) {
    const disciplina = await this.disciplinaFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  //

  async disciplinaCreate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IDisciplinaInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('disciplina:create', { dto });

    // =========================================================

    const dtoDisciplina = pick(dto, ['nome', 'cargaHoraria']);

    const disciplina = this.disciplinaRepository.create();

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    // =========================================================

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return this.disciplinaFindByIdStrict(contextoDeAcesso, { id: disciplina.id });
  }

  async disciplinaUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IDisciplinaUpdateDto) {
    // =========================================================

    const currentDisciplina = await this.disciplinaFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('disciplina:update', { dto }, dto.id, this.disciplinaRepository.createQueryBuilder(aliasDisciplina));

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

    return this.disciplinaFindByIdStrict(contextoDeAcesso, { id: disciplina.id });
  }

  //

  async disciplinaDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IDisciplinaDeleteOneByIdInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('disciplina:delete', { dto }, dto.id, this.disciplinaRepository.createQueryBuilder(aliasDisciplina));

    // =========================================================

    const disciplina = await this.disciplinaFindByIdStrict(contextoDeAcesso, dto);

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
