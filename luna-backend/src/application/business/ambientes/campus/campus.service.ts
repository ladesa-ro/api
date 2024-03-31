import { Injectable, NotFoundException } from '@nestjs/common';
import { get, map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { CampusEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { ModalidadeEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ensino/modalidade.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { IModalidadeQueryBuilderViewOptions, ModalidadeService } from '../../ensino/modalidade/modalidade.service';
import { EnderecoService, IEnderecoQueryBuilderViewOptions } from '../endereco/endereco.service';

// ============================================================================

const aliasCampus = 'campus';

// ============================================================================

export type ICampusQueryBuilderViewOptions = {
  loadEndereco?: IQueryBuilderViewOptionsLoad<IEnderecoQueryBuilderViewOptions>;
  loadModalidades?: IQueryBuilderViewOptionsLoad<IModalidadeQueryBuilderViewOptions>;
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
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nomeFantasia`,
      `${alias}.razaoSocial`,
      `${alias}.apelido`,
      `${alias}.cnpj`,
    ]);

    const loadEndereco = getQueryBuilderViewLoadMeta(options.loadEndereco, true, `${alias}_endereco`);

    if (loadEndereco) {
      qb.leftJoin(`${alias}.endereco`, `${loadEndereco.alias}`);
      EnderecoService.EnderecoQueryBuilderView(loadEndereco.alias, qb, loadEndereco.options);
    }

    const loadModalidades = getQueryBuilderViewLoadMeta(options.loadModalidades, true, `${alias}_modalidade`);

    if (loadModalidades) {
      const aliasCampusPossuiModalidade = `${alias}_campus_possui_modalidade`;
      qb.leftJoin(`${alias}.campusPossuiModalidade`, aliasCampusPossuiModalidade);

      qb.leftJoinAndMapMany(`${alias}.modalidades`, ModalidadeEntity, `${loadModalidades.alias}`, `${loadModalidades.alias}.id = ${aliasCampusPossuiModalidade}.id_modalidade_fk`);
      qb.expressionMap.selects.splice(qb.expressionMap.selects.length - 1, 1);

      ModalidadeService.ModalidadeQueryBuilderView(loadModalidades.alias, qb, loadModalidades.options);
    }
  }

  //

  async campusFindAll(contextoDeAcesso: IContextoDeAcesso, dto?: Dto.ISearchInputDto): Promise<Dto.ICampusFindAllResultDto> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('campus:find', qb, aliasCampus, null);

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

  async campusFindById(
    contextoDeAcesso: IContextoDeAcesso,
    dto: Dto.ICampusFindOneByIdInputDto,
    options?: ICampusQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dto.ICampusFindOneResultDto | null> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('campus:find', qb, aliasCampus, null);

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

  async campusFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: Dto.ICampusFindOneByIdInputDto) {
    const campus = await this.campusFindById(contextoDeAcesso, dto);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  async campusFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: Dto.ICampusFindOneByIdInputDto['id'],
    options?: ICampusQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dto.ICampusFindOneResultDto | null> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('campus:find', qb, aliasCampus, null);

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

  async campusFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: Dto.ICampusFindOneByIdInputDto['id'], options?: ICampusQueryBuilderViewOptions, selection?: string[]) {
    const campus = await this.campusFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  //

  async campusCreate(contextoDeAcesso: IContextoDeAcesso, dto: Dto.ICampusInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('campus:create', { dto });

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

    return this.campusFindByIdStrict(contextoDeAcesso, { id: campus.id });
  }

  async campusUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Dto.ICampusUpdateDto) {
    // =========================================================

    const currentCampus = await this.campusFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('campus:update', { dto }, dto.id, this.campusRepository.createQueryBuilder(aliasCampus));

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

    return this.campusFindByIdStrict(contextoDeAcesso, { id: campus.id });
  }

  //

  async campusDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Dto.ICampusDeleteOneByIdInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('campus:delete', { dto }, dto.id, this.campusRepository.createQueryBuilder(aliasCampus));

    // =========================================================

    const campus = await this.campusFindByIdStrict(contextoDeAcesso, dto);

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
