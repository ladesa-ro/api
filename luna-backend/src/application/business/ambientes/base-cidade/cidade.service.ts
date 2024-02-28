import { Injectable, NotFoundException } from '@nestjs/common';
import { map } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dto from '../../(dtos)';
import { IClientAccess } from '../../../../domain/client-access';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { EstadoService, IEstadoQueryBuilderViewOptions } from '../base-estado/estado.service';

const aliasCidade = 'cidade';

export type ICidadeQueryBuilderViewOptions = {
  loadEstado?: IQueryBuilderViewOptionsLoad<IEstadoQueryBuilderViewOptions>;
};

@Injectable()
export class CidadeService {
  constructor(private databaseContextService: DatabaseContextService) {}

  //

  static CidadeQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: ICidadeQueryBuilderViewOptions = {}) {
    const loadEstado = getQueryBuilderViewLoadMeta(options.loadEstado, true, `${alias}_estado`);

    qb.addSelect([`${alias}.id`, `${alias}.nome`]);

    if (loadEstado) {
      qb.innerJoin(`${alias}.estado`, `${loadEstado.alias}`);
      EstadoService.EstadoQueryBuilderView(loadEstado.alias, qb);
    }
  }

  //

  get cidadeRepository() {
    return this.databaseContextService.baseCidadeRepository;
  }

  //

  async findAll(clientAccess: IClientAccess, dto?: Dto.ISearchInputDto) {
    // =========================================================

    const qb = this.cidadeRepository.createQueryBuilder('cidade');

    // =========================================================

    await clientAccess.applyFilter('cidade:find', qb, aliasCidade, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        'nome',
        'estado.id',
        'estado.sigla',
        'estado.nome',
      ],
      relations: {
        estado: true,
      },
      sortableColumns: ['id', 'estado.nome', 'estado.sigla'],
      searchableColumns: ['nome', 'estado.nome', 'estado.sigla'],
      defaultSortBy: [
        ['estado.nome', 'ASC'],
        ['nome', 'ASC'],
      ],
      filterableColumns: {
        'estado.id': [FilterOperator.EQ],
        'estado.nome': [FilterOperator.EQ],
        'estado.sigla': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    CidadeService.CidadeQueryBuilderView(aliasCidade, qb, {
      loadEstado: { alias: 'estado' },
    });

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async findById(clientAccess: IClientAccess, dto: Dto.ICidadeFindOneByIdInputDto) {
    // =========================================================

    const { baseCidadeRepository } = this.databaseContextService;

    // =========================================================

    const qb = baseCidadeRepository.createQueryBuilder(aliasCidade);

    // =========================================================

    await clientAccess.applyFilter('cidade:find', qb, aliasCidade, null);

    // =========================================================

    qb.andWhere('cidade.id = :id', { id: dto.id });

    // =========================================================

    qb.select([]);

    CidadeService.CidadeQueryBuilderView(aliasCidade, qb, {
      loadEstado: { alias: 'estado' },
    });

    // =========================================================

    const cidade = await qb.getOne();

    // =========================================================

    return cidade;
  }

  async findByIdStrict(clientAccess: IClientAccess, dto: Dto.ICidadeFindOneByIdInputDto) {
    const cidade = await this.findById(clientAccess, dto);

    if (!cidade) {
      throw new NotFoundException();
    }

    return cidade;
  }
}
