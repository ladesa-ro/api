import { Injectable, NotFoundException } from '@nestjs/common';
import { get, map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { CampusEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { EnderecoService, IEnderecoQueryBuilderViewOptions } from '../endereco/endereco.service';

// ============================================================================

const aliasCampus = 'campus';

// ============================================================================

export type ICampusQueryBuilderViewOptions = {
  loadEndereco?: IQueryBuilderViewOptionsLoad<IEnderecoQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class CampusService {
  constructor(
    private enderecoService: EnderecoService,
    private databaseContext: DatabaseContextService,
  ) {}

  get campusRepository() {
    return this.databaseContext.campusRepository;
  }

  //

  static CampusQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: ICampusQueryBuilderViewOptions = {}) {
    const loadEndereco = getQueryBuilderViewLoadMeta(options.loadEndereco, true, `${alias}_endereco`);

    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nomeFantasia`,
      `${alias}.razaoSocial`,
      `${alias}.apelido`,
      `${alias}.cnpj`,
    ]);

    if (loadEndereco) {
      qb.innerJoin(`${alias}.endereco`, `${loadEndereco.alias}`);
      EnderecoService.EnderecoQueryBuilderView(loadEndereco.alias, qb, loadEndereco.options);
    }
  }

  //

  async campusFindAll(clientAccess: IClientAccess, dto?: Dto.ISearchInputDto): Promise<Dto.ICampusFindAllResultDto> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await clientAccess.applyFilter('campus:find', qb, aliasCampus, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nomeFantasia',
        'razaoSocial',
        'apelido',
        'cnpj',
        'dateCreated',
        //
        'endereco.cidade.id',
        'endereco.cidade.nome',
        'endereco.cidade.estado.id',
        'endereco.cidade.estado.nome',
        'endereco.cidade.estado.sigla',
      ],
      relations: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
      sortableColumns: [
        //
        'id',
        //
        'nomeFantasia',
        'razaoSocial',
        'apelido',
        'cnpj',
        'dateCreated',
        //
        'endereco.cidade.id',
        'endereco.cidade.nome',
        'endereco.cidade.estado.id',
        'endereco.cidade.estado.nome',
        'endereco.cidade.estado.sigla',
      ],
      searchableColumns: [
        //
        'id',
        //
        'nomeFantasia',
        'razaoSocial',
        'apelido',
        'cnpj',
        'dateCreated',
        //
        'endereco.cidade.nome',
        'endereco.cidade.estado.nome',
        'endereco.cidade.estado.sigla',
      ],
      defaultSortBy: [
        ['endereco.cidade.estado.nome', 'ASC'],
        ['nomeFantasia', 'ASC'],
        ['dateCreated', 'ASC'],
      ],
      filterableColumns: {
        'endereco.cidade.id': [FilterOperator.EQ],
        'endereco.cidade.nome': [FilterOperator.EQ],
        'endereco.cidade.estado.id': [FilterOperator.EQ],
        'endereco.cidade.estado.nome': [FilterOperator.EQ],
        'endereco.cidade.estado.sigla': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    CampusService.CampusQueryBuilderView(aliasCampus, qb, {
      loadEndereco: true,
    });

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async campusFindById(clientAccess: IClientAccess, dto: Dto.ICampusFindOneByIdInputDto, options?: ICampusQueryBuilderViewOptions, selection?: string[]): Promise<Dto.ICampusFindOneResultDto | null> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await clientAccess.applyFilter('campus:find', qb, aliasCampus, null);

    // =========================================================

    qb.andWhere(`${aliasCampus}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    CampusService.CampusQueryBuilderView(aliasCampus, qb, {
      loadEndereco: true,
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const campus = await qb.getOne();

    // =========================================================

    return campus;
  }

  async campusFindByIdStrict(clientAccess: IClientAccess, dto: Dto.ICampusFindOneByIdInputDto) {
    const campus = await this.campusFindById(clientAccess, dto);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  async campusFindByIdSimple(
    clientAccess: IClientAccess,
    id: Dto.ICampusFindOneByIdInputDto['id'],
    options?: ICampusQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dto.ICampusFindOneResultDto | null> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await clientAccess.applyFilter('campus:find', qb, aliasCampus, null);

    // =========================================================

    qb.andWhere(`${aliasCampus}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    CampusService.CampusQueryBuilderView(aliasCampus, qb, {
      loadEndereco: false,
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const campus = await qb.getOne();

    // =========================================================

    return campus;
  }

  async campusFindByIdSimpleStrict(clientAccess: IClientAccess, id: Dto.ICampusFindOneByIdInputDto['id'], options?: ICampusQueryBuilderViewOptions, selection?: string[]) {
    const campus = await this.campusFindByIdSimple(clientAccess, id, options, selection);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  //

  async campusCreate(clientAccess: IClientAccess, dto: Dto.ICampusInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('campus:create', { dto });

    // =========================================================

    const dtoCampus = pick(dto, ['nomeFantasia', 'razaoSocial', 'apelido', 'cnpj']);

    const campus = this.campusRepository.create();

    this.campusRepository.merge(campus, {
      ...dtoCampus,
    });

    // =========================================================

    const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(null, dto.endereco);

    this.campusRepository.merge(campus, {
      endereco: {
        id: endereco.id,
      },
    });

    // =========================================================

    await this.campusRepository.save(campus);

    // =========================================================

    return this.campusFindByIdStrict(clientAccess, { id: campus.id });
  }

  async campusUpdate(clientAccess: IClientAccess, dto: Dto.ICampusUpdateDto) {
    // =========================================================

    const currentCampus = await this.campusFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    // =========================================================

    await clientAccess.ensureCanReach('campus:update', { dto }, this.campusRepository.createQueryBuilder(aliasCampus), dto.id);

    const dtoCampus = pick(dto, ['nomeFantasia', 'razaoSocial', 'apelido', 'cnpj']);

    const campus = <CampusEntity>{
      id: currentCampus.id,
    };

    this.campusRepository.merge(campus, {
      ...dtoCampus,
    });

    // =========================================================

    const dtoEndereco = get(dto, 'endereco');

    if (dtoEndereco) {
      const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(currentCampus.endereco.id, dtoEndereco);

      this.campusRepository.merge(campus, {
        endereco: {
          id: endereco.id,
        },
      });
    }

    // =========================================================

    await this.campusRepository.save(campus);

    // =========================================================

    return this.campusFindByIdStrict(clientAccess, { id: campus.id });
  }

  //

  async campusDeleteOneById(clientAccess: IClientAccess, dto: Dto.ICampusDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('campus:delete', { dto }, this.campusRepository.createQueryBuilder(aliasCampus), dto.id);

    // =========================================================

    const campus = await this.campusFindByIdStrict(clientAccess, dto);

    // =========================================================

    if (campus) {
      await this.campusRepository
        .createQueryBuilder(aliasCampus)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :campusId', { campusId: campus.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
