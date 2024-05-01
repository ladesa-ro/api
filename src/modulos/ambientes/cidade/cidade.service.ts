import { AppResource, AppResourceView } from '@/legacy/utils/qbEfficientLoad';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as Dto from '@sisgea/spec';
import { map } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { getPaginateQueryFromSearchInput, getPaginatedResultDto } from '../../../legacy';
import { paginateConfig } from '../../../legacy/utils';

const aliasCidade = 'cidade';

@Injectable()
export class CidadeService {
  constructor(private databaseContextService: DatabaseContextService) {}

  //

  get cidadeRepository() {
    return this.databaseContextService.cidadeRepository;
  }

  //

  async findAll(contextoDeAcesso: IContextoDeAcesso, dto?: Dto.ISearchInputDto, selection?: string[]) {
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
        ['nome', 'ASC'],
        ['estado.nome', 'ASC'],
      ],
      filterableColumns: {
        'estado.id': [FilterOperator.EQ],
        'estado.nome': [FilterOperator.EQ],
        'estado.sigla': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    AppResourceView(AppResource.CIDADE, qb, aliasCidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return getPaginatedResultDto(paginated);
  }

  async findById(contextoDeAcesso: IContextoDeAcesso, dto: Dto.ICidadeFindOneByIdInputDto, selection?: string[]) {
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
    AppResourceView(AppResource.CIDADE, qb, aliasCidade, selection);

    // =========================================================

    const cidade = await qb.getOne();

    // =========================================================

    return cidade;
  }

  async findByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: Dto.ICidadeFindOneByIdInputDto, selection?: string[]) {
    const cidade = await this.findById(contextoDeAcesso, dto, selection);

    if (!cidade) {
      throw new NotFoundException();
    }

    return cidade;
  }
}
