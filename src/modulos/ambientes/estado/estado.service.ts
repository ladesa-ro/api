import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { map } from 'lodash';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { QbEfficientLoad } from '../../../helpers/ladesa/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../helpers/ladesa/search/search-strategies';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { paginateConfig } from '../../../legacy/utils';

const aliasEstado = 'estado';

@Injectable()
export class EstadoService {
  constructor(private databaseContext: DatabaseContextService) {}

  get baseEstadoRepository() {
    return this.databaseContext.estadoRepository;
  }

  //

  async findAll(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EstadoListCombinedInput | null = null, selection?: string[]): Promise<LadesaTypings.EstadoListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('estado:find', qb, aliasEstado, null);

    // =========================================================

    const paginated = await LadesaSearch('/estado', dto ?? null, qb, {
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
    QbEfficientLoad(LadesaTypings.Tokens.Estado.Entity, qb, aliasEstado, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async findById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EstadoFindOneInput, selection?: string[]) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder('estado');

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('estado:find', qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Estado.Entity, qb, aliasEstado, selection);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.EstadoFindOneInput, selection?: string[]) {
    const estado = await this.findById(contextoDeAcesso, dto, selection);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }
}
