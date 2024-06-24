import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { QbEfficientLoad } from '../../../helpers/ladesa/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../helpers/ladesa/search/search-strategies';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { ReservaEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { paginateConfig } from '../../../legacy/utils';
import { UsuarioService } from '../../autenticacao/usuario/usuario.service';
import { AmbienteService } from '../ambiente/ambiente.service';

// ============================================================================

const aliasReserva = 'reserva';

// ============================================================================

@Injectable()
export class ReservaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private usuarioService: UsuarioService,
    private ambienteService: AmbienteService,
  ) {}

  get reservaRepository() {
    return this.databaseContext.reservaRepository;
  }

  //

  async reservaFindAll(
    contextoDeAcesso: IContextoDeAcesso,
    dto: LadesaTypings.ReservaListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.ReservaListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('reserva:find', qb, aliasReserva, null);

    // =========================================================

    const paginated = await LadesaSearch('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
      ],
      sortableColumns: [
        //
        'situacao',
        'motivo',
        'tipo',
        'dataInicio',
        'dataTermino',
        'ambiente.id',
        'ambiente.nome',
        'ambiente.capacidade',
        'ambiente.bloco.codigo',
        'ambiente.bloco.nome',
      ],
      searchableColumns: [
        //
        'id',
        //
        'situacao',
        'motivo',
        'tipo',
        'dataInicio',
        'dataTermino',
        'ambiente.nome',
        'ambiente.descricao',
        'ambiente.codigo',
        'ambiente.bloco.nome',
        'ambiente.bloco.codigo',
        //
      ],
      relations: {
        ambiente: {
          bloco: {
            campus: true,
          },
        },
        usuario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        situacao: [FilterOperator.EQ],
        tipo: [FilterOperator.EQ],
        dataInicio: [FilterOperator.EQ, FilterOperator.GT, FilterOperator.GTE, FilterOperator.LT, FilterOperator.LTE],
        dataTermino: [FilterOperator.EQ, FilterOperator.GT, FilterOperator.GTE, FilterOperator.LT, FilterOperator.LTE, FilterOperator.NULL],
        'ambiente.id': [FilterOperator.EQ],
        'ambiente.bloco.id': [FilterOperator.EQ],
        'ambiente.bloco.campus.id': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Reserva.Views.FindOneResult, qb, aliasReserva, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async reservaFindById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.ReservaFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.ReservaFindOneResult | null> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('reserva:find', qb, aliasReserva, null);

    // =========================================================

    qb.andWhere(`${aliasReserva}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Reserva.Views.FindOneResult, qb, aliasReserva, selection);

    // =========================================================

    const reserva = await qb.getOne();

    // =========================================================

    return reserva;
  }

  async reservaFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.ReservaFindOneInput, selection?: string[] | boolean) {
    const reserva = await this.reservaFindById(contextoDeAcesso, dto, selection);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  async reservaFindByIdSimple(contextoDeAcesso: IContextoDeAcesso, id: LadesaTypings.ReservaFindOneInput['id'], selection?: string[]): Promise<LadesaTypings.ReservaFindOneResult | null> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('reserva:find', qb, aliasReserva, null);

    // =========================================================

    qb.andWhere(`${aliasReserva}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Reserva.Views.FindOneResult, qb, aliasReserva, selection);

    // =========================================================

    const reserva = await qb.getOne();

    // =========================================================

    return reserva;
  }

  async reservaFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: LadesaTypings.ReservaFindOneInput['id'], selection?: string[]) {
    const reserva = await this.reservaFindByIdSimple(contextoDeAcesso, id, selection);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  //

  async reservaCreate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.ReservaCreateCombinedInput) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('reserva:create', { dto });

    // =========================================================

    const dtoReserva = pick(dto.body, ['situacao', 'motivo', 'tipo', 'dataInicio', 'dataTermino']);

    const reserva = this.reservaRepository.create();

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    // =========================================================

    const ambiente = await this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id: dto.body.ambiente.id });

    this.reservaRepository.merge(reserva, {
      ambiente: {
        id: ambiente.id,
      },
    });

    // =========================================================

    const usuario = await this.usuarioService.usuarioFindByIdStrict(contextoDeAcesso, { id: dto.body.usuario.id });

    this.reservaRepository.merge(reserva, {
      usuario: {
        id: usuario.id,
      },
    });

    // =========================================================

    await this.reservaRepository.save(reserva);

    // =========================================================

    return this.reservaFindByIdStrict(contextoDeAcesso, { id: reserva.id });
  }

  async reservaUpdate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.ReservaUpdateByIDCombinedInput) {
    // =========================================================

    const currentReserva = await this.reservaFindByIdStrict(contextoDeAcesso, {
      id: dto.params.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('reserva:update', { dto }, dto.params.id, this.reservaRepository.createQueryBuilder(aliasReserva));

    const dtoReserva = pick(dto.body, ['situacao', 'motivo', 'tipo', 'dataInicio', 'dataTermino']);

    const reserva = {
      id: currentReserva.id,
    } as ReservaEntity;

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    // =========================================================

    if (has(dto.body, 'ambiente') && dto.body.ambiente !== undefined) {
      const ambiente = await this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id: dto.body.ambiente.id });

      this.reservaRepository.merge(reserva, {
        ambiente: {
          id: ambiente.id,
        },
      });
    }

    // =========================================================

    if (has(dto.body, 'usuario') && dto.body.usuario !== undefined) {
      const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(contextoDeAcesso, dto.body.usuario.id);

      this.reservaRepository.merge(reserva, {
        usuario: {
          id: usuario.id,
        },
      });
    }

    // =========================================================

    await this.reservaRepository.save(reserva);

    // =========================================================

    return this.reservaFindByIdStrict(contextoDeAcesso, { id: reserva.id });
  }

  //

  async reservaDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.ReservaFindOneInput) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('reserva:delete', { dto }, dto.id, this.reservaRepository.createQueryBuilder(aliasReserva));

    // =========================================================

    const reserva = await this.reservaFindByIdStrict(contextoDeAcesso, dto);

    // =========================================================

    if (reserva) {
      await this.reservaRepository
        .createQueryBuilder(aliasReserva)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :reservaId', { reservaId: reserva.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
