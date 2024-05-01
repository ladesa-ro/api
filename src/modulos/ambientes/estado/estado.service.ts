import { AppResource, AppResourceView } from '@/legacy/utils/qbEfficientLoad';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as Dto from '@sisgea/spec';
import { IEstadoFindOneByIdInputDto, IEstadoFindOneByUfInputDto } from '@sisgea/spec';
import { map } from 'lodash';
import { paginate } from 'nestjs-paginate';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { getPaginateQueryFromSearchInput, getPaginatedResultDto } from '../../../legacy';
import { paginateConfig } from '../../../legacy/utils';

const aliasEstado = 'estado';

@Injectable()
export class EstadoService {
  constructor(private databaseContext: DatabaseContextService) {}

  get baseEstadoRepository() {
    return this.databaseContext.estadoRepository;
  }

  //

  async findAll(clienteAccess: IContextoDeAcesso, dto?: Dto.ISearchInputDto, selection?: string[]): Promise<Dto.IEstadoFindAllResultDto> {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await clienteAccess.aplicarFiltro('estado:find', qb, aliasEstado, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
      ],
      searchableColumns: [
        //
        'nome',
        'sigla',
      ],
      sortableColumns: [
        //
        'id',
        'nome',
        'sigla',
      ],
      defaultSortBy: [
        //
        ['nome', 'ASC'],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    AppResourceView(AppResource.ESTADO, qb, aliasEstado, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return getPaginatedResultDto(paginated);
  }

  async findByUf(clienteAccess: IContextoDeAcesso, dto: IEstadoFindOneByUfInputDto, selection?: string[]) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await clienteAccess.aplicarFiltro('estado:find', qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.sigla = :sigla`, { sigla: dto.uf.toUpperCase() });

    // =========================================================

    qb.select([]);
    AppResourceView(AppResource.ESTADO, qb, aliasEstado, selection);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByUfStrict(clienteAccess: IContextoDeAcesso, dto: IEstadoFindOneByUfInputDto, selection?: string[]) {
    const estado = await this.findByUf(clienteAccess, dto, selection);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }

  async findById(clienteAccess: IContextoDeAcesso, dto: IEstadoFindOneByIdInputDto, selection?: string[]) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder('estado');

    // =========================================================

    await clienteAccess.aplicarFiltro('estado:find', qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    AppResourceView(AppResource.ESTADO, qb, aliasEstado, selection);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByIdStrict(clienteAccess: IContextoDeAcesso, dto: IEstadoFindOneByIdInputDto, selection?: string[]) {
    const estado = await this.findById(clienteAccess, dto, selection);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }
}
