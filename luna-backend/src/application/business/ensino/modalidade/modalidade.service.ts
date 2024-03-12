import { Injectable, NotFoundException } from '@nestjs/common';
import { map, pick } from 'lodash';
import { paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { ModalidadeEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ensino/ensino/modalidade.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';

// ============================================================================

const aliasModalidade = 'modalidade';

// ============================================================================

export type IModalidadeQueryBuilderViewOptions = {};

// ============================================================================

@Injectable()
export class ModalidadeService {
  constructor(private databaseContext: DatabaseContextService) {}

  get modalidadeRepository() {
    return this.databaseContext.modalidadeRepository;
  }

  //

  static ModalidadeQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, _: IModalidadeQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
      `${alias}.slug`,
    ]);
  }

  //

  async modalidadeFindAll(clientAccess: IClientAccess, dto?: Dtos.ISearchInputDto): Promise<Dtos.IModalidadeFindAllResultDto> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    await clientAccess.applyFilter('modalidade:find', qb, aliasModalidade, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        'slug',
        'dateCreated',
        //
      ],
      sortableColumns: [
        //
        'nome',
        'slug',
        'dateCreated',
      ],
      searchableColumns: [
        //
        'id',
        //
        'nome',
        'slug',
        //
      ],
      defaultSortBy: [
        ['slug', 'ASC'],
        ['nome', 'ASC'],
        ['dateCreated', 'ASC'],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);

    ModalidadeService.ModalidadeQueryBuilderView(aliasModalidade, qb, {});

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async modalidadeFindById(clientAccess: IClientAccess, dto: Dtos.IModalidadeFindOneByIdInputDto): Promise<Dtos.IModalidadeFindOneResultDto | null> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    await clientAccess.applyFilter('modalidade:find', qb, aliasModalidade, null);

    // =========================================================

    qb.andWhere(`${aliasModalidade}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    ModalidadeService.ModalidadeQueryBuilderView(aliasModalidade, qb, {});

    // =========================================================

    const modalidade = await qb.getOne();

    // =========================================================

    return modalidade;
  }

  async modalidadeFindByIdStrict(clientAccess: IClientAccess, dto: Dtos.IModalidadeFindOneByIdInputDto) {
    const modalidade = await this.modalidadeFindById(clientAccess, dto);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  async modalidadeFindByIdSimple(
    clientAccess: IClientAccess,
    id: Dtos.IModalidadeFindOneByIdInputDto['id'],
    options?: IModalidadeQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.IModalidadeFindOneResultDto | null> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    await clientAccess.applyFilter('modalidade:find', qb, aliasModalidade, null);

    // =========================================================

    qb.andWhere(`${aliasModalidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    ModalidadeService.ModalidadeQueryBuilderView(aliasModalidade, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const modalidade = await qb.getOne();

    // =========================================================

    return modalidade;
  }

  async modalidadeFindByIdSimpleStrict(clientAccess: IClientAccess, id: Dtos.IModalidadeFindOneByIdInputDto['id'], options?: IModalidadeQueryBuilderViewOptions, selection?: string[]) {
    const modalidade = await this.modalidadeFindByIdSimple(clientAccess, id, options, selection);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  //

  async modalidadeCreate(clientAccess: IClientAccess, dto: Dtos.IModalidadeInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('modalidade:create', { dto });

    // =========================================================

    const dtoModalidade = pick(dto, ['nome', 'slug']);

    const modalidade = this.modalidadeRepository.create();

    this.modalidadeRepository.merge(modalidade, {
      ...dtoModalidade,
    });

    // =========================================================

    await this.modalidadeRepository.save(modalidade);

    // =========================================================

    return this.modalidadeFindByIdStrict(clientAccess, { id: modalidade.id });
  }

  async modalidadeUpdate(clientAccess: IClientAccess, dto: Dtos.IModalidadeUpdateDto) {
    // =========================================================

    const currentModalidade = await this.modalidadeFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    // =========================================================

    await clientAccess.ensureCanReach('modalidade:update', { dto }, this.modalidadeRepository.createQueryBuilder(aliasModalidade), dto.id);

    const dtoModalidade = pick(dto, ['nome', 'slug']);

    const modalidade = <ModalidadeEntity>{
      id: currentModalidade.id,
    };

    this.modalidadeRepository.merge(modalidade, {
      ...dtoModalidade,
    });

    // =========================================================

    await this.modalidadeRepository.save(modalidade);

    // =========================================================

    return this.modalidadeFindByIdStrict(clientAccess, { id: modalidade.id });
  }

  //

  async modalidadeDeleteOneById(clientAccess: IClientAccess, dto: Dtos.IModalidadeDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('modalidade:delete', { dto }, this.modalidadeRepository.createQueryBuilder(aliasModalidade), dto.id);

    // =========================================================

    const modalidade = await this.modalidadeFindByIdStrict(clientAccess, dto);

    // =========================================================

    if (modalidade) {
      await this.modalidadeRepository
        .createQueryBuilder(aliasModalidade)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :modalidadeId', { modalidadeId: modalidade.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
