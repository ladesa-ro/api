import { Injectable, NotFoundException } from '@nestjs/common';
import * as Dto from '@sisgea/spec';
import { map } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../../domain/contexto-de-acesso';
import { getPaginateQueryFromSearchInput, getPaginatedResultDto } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { EstadoService, IEstadoQueryBuilderViewOptions } from '../estado/estado.service';

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
      qb.leftJoin(`${alias}.estado`, `${loadEstado.alias}`);
      EstadoService.EstadoQueryBuilderView(loadEstado.alias, qb);
    }
  }

  //

  get cidadeRepository() {
    return this.databaseContextService.cidadeRepository;
  }

  //

  async findAll(contextoDeAcesso: IContextoDeAcesso, dto?: Dto.ISearchInputDto) {
    // =========================================================

    const qb = this.cidadeRepository.createQueryBuilder('cidade');

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('cidade:find', qb, aliasCidade, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        //
        'estado.id',
        'estado.sigla',
        'estado.nome',
        //
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

    return getPaginatedResultDto(paginated);
  }

  async findById(contextoDeAcesso: IContextoDeAcesso, dto: Dto.ICidadeFindOneByIdInputDto) {
    // =========================================================

    const { cidadeRepository: baseCidadeRepository } = this.databaseContextService;

    // =========================================================

    const qb = baseCidadeRepository.createQueryBuilder(aliasCidade);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('cidade:find', qb, aliasCidade, null);

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

  async findByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: Dto.ICidadeFindOneByIdInputDto) {
    const cidade = await this.findById(contextoDeAcesso, dto);

    if (!cidade) {
      throw new NotFoundException();
    }

    return cidade;
  }
}
