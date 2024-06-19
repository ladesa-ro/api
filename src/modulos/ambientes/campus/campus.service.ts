import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { get, map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { v4 } from 'uuid';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { QbEfficientLoad } from '../../../helpers/ladesa/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../helpers/ladesa/search/search-strategies';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { CampusEntity, ModalidadeEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { paginateConfig } from '../../../legacy/utils';
import { ModalidadeService } from '../../ensino/modalidade/modalidade.service';
import { EnderecoService } from '../endereco/endereco.service';

// ============================================================================

const aliasCampus = 'campus';

// ============================================================================

export type ICampusQueryBuilderViewOptions = {
  loadEndereco?: boolean;
};

// ============================================================================

@Injectable()
export class CampusService {
  constructor(
    private enderecoService: EnderecoService,
    private modalidadeService: ModalidadeService,
    private databaseContext: DatabaseContextService,
  ) {}

  get campusRepository() {
    return this.databaseContext.campusRepository;
  }

  get campusPossuiModalidadeRepository() {
    return this.databaseContext.campusPossuiModalidadeRepository;
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

    if (options.loadEndereco) {
      qb.leftJoin(`${alias}.endereco`, `${alias}_endereco`);
      EnderecoService.EnderecoQueryBuilderView(`${alias}_endereco`, qb);
    }

    {
      const loadModalidadesAlias = `${alias}_modalidade`;

      const aliasCampusPossuiModalidade = `${alias}_campus_possui_modalidade`;
      qb.leftJoin(`${alias}.campusPossuiModalidade`, aliasCampusPossuiModalidade);

      qb.leftJoinAndMapMany(`${alias}.modalidades`, ModalidadeEntity, `${loadModalidadesAlias}`, `${loadModalidadesAlias}.id = ${aliasCampusPossuiModalidade}.id_modalidade_fk`);
      qb.expressionMap.selects.splice(qb.expressionMap.selects.length - 1, 1);

      QbEfficientLoad(LadesaTypings.Tokens.Modalidade.Entity, qb, loadModalidadesAlias);
    }
  }

  //

  async campusFindAll(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.CampusListCombinedInput | null = null): Promise<LadesaTypings.CampusListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('campus:find', qb, aliasCampus, null);

    // =========================================================

    const paginated = await LadesaSearch('#/', dto, qb, {
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
        ['nomeFantasia', 'ASC'],
        ['endereco.cidade.estado.nome', 'ASC'],
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

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async campusFindById(
    contextoDeAcesso: IContextoDeAcesso,
    dto: LadesaTypings.CampusFindOneInput,
    options?: ICampusQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<LadesaTypings.CampusFindOneResult | null> {
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

  async campusFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.CampusFindOneInput) {
    const campus = await this.campusFindById(contextoDeAcesso, dto);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  async campusFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: LadesaTypings.CampusFindOneInput['id'],
    options?: ICampusQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<LadesaTypings.CampusFindOneResult | null> {
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

  async campusFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: LadesaTypings.CampusFindOneInput['id'], options?: ICampusQueryBuilderViewOptions, selection?: string[]) {
    const campus = await this.campusFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  //

  async campusCreate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.CampusCreateCombinedInput) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('campus:create', { dto });

    // =========================================================

    const campus = await this.databaseContext.transaction(async ({ databaseContext: { campusRepository } }) => {
      // =========================================================

      const dtoCampus = pick(dto.body, ['nomeFantasia', 'razaoSocial', 'apelido', 'cnpj']);

      const campus = campusRepository.create();

      campusRepository.merge(campus, {
        ...dtoCampus,
      });

      campusRepository.merge(campus, {
        id: v4(),
      });

      // =========================================================

      const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(null, dto.body.endereco);

      campusRepository.merge(campus, {
        endereco: {
          id: endereco.id,
        },
      });

      // =========================================================

      await campusRepository.save(campus);

      // =========================================================

      // const modalidades = get(dto.body, 'modalidades')!;

      // for (const modalidadeRef of modalidades) {
      //   const modalidade = await this.modalidadeService.modalidadeFindByIdStrict(contextoDeAcesso, { id: modalidadeRef.id });

      //   const campusPossuiModalidade = campusPossuiModalidadeRepository.create();

      //   campusPossuiModalidadeRepository.merge(campusPossuiModalidade, {
      //     id: v4(),
      //   });

      //   campusPossuiModalidadeRepository.merge(campusPossuiModalidade, {
      //     modalidade: {
      //       id: modalidade.id,
      //     },
      //     campus: {
      //       id: campus.id,
      //     },
      //   });

      //   await campusPossuiModalidadeRepository.save(campusPossuiModalidade);
      // }

      // =========================================================

      return campus;
    });

    return this.campusFindByIdStrict(contextoDeAcesso, { id: campus.id });
  }

  async campusUpdate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.CampusUpdateByIDCombinedInput) {
    // =========================================================

    const currentCampus = await this.campusFindByIdStrict(contextoDeAcesso, {
      id: dto.params.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('campus:update', { dto }, dto.params.id, this.campusRepository.createQueryBuilder(aliasCampus));

    const campus = await this.databaseContext.transaction(async ({ databaseContext: { campusRepository } }) => {
      const dtoCampus = pick(dto.body, ['nomeFantasia', 'razaoSocial', 'apelido', 'cnpj']);

      const campus = {
        id: currentCampus.id,
      } as CampusEntity;

      campusRepository.merge(campus, {
        ...dtoCampus,
      });

      campusRepository.merge(campus, { id: currentCampus.id });

      // =========================================================

      const dtoEndereco = get(dto.body, 'endereco');

      if (dtoEndereco) {
        const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(currentCampus.endereco.id, dtoEndereco);

        campusRepository.merge(campus, {
          endereco: {
            id: endereco.id,
          },
        });
      }

      // =========================================================

      await campusRepository.save(campus);

      // =========================================================

      // if (has(dto, 'modalidades')) {
      //   const modalidades = get(dto, 'modalidades')!;

      //   const currentCampusPossuiModalidades = await campusPossuiModalidadeRepository
      //     //
      //     .createQueryBuilder('c_p_m')
      //     .select('c_p_m.id')
      //     .innerJoin('c_p_m.campus', 'campus')
      //     .where('campus.id = :campusId', { campusId: campus.id })
      //     .getMany();

      //   await campusPossuiModalidadeRepository
      //     //
      //     .createQueryBuilder()
      //     .delete()
      //     .whereInIds(map(currentCampusPossuiModalidades, 'id'))
      //     .execute();

      //   for (const modalidadeRef of modalidades) {
      //     const modalidade = await this.modalidadeService.modalidadeFindByIdStrict(contextoDeAcesso, {
      //       id: modalidadeRef.id,
      //     });

      //     const campusPossuiModalidade = campusPossuiModalidadeRepository.create();

      //     campusPossuiModalidadeRepository.merge(campusPossuiModalidade, {
      //       id: v4(),
      //     });

      //     campusPossuiModalidadeRepository.merge(campusPossuiModalidade, {
      //       modalidade: {
      //         id: modalidade.id,
      //       },
      //       campus: {
      //         id: campus.id,
      //       },
      //     });

      //     await campusPossuiModalidadeRepository.save(campusPossuiModalidade);
      //   }
      // }

      // =========================================================

      return campus;
    });

    // =========================================================

    return this.campusFindByIdStrict(contextoDeAcesso, { id: campus.id });
  }

  //

  async campusDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.CampusFindOneInput) {
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
