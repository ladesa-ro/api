import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { ReservaEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ambientes/reserva.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { IUsuarioQueryBuilderViewOptions, UsuarioService } from '../../autenticacao/usuario/usuario.service';
import { AmbienteService, IAmbienteQueryBuilderViewOptions } from '../ambiente/ambiente.service';

// ============================================================================

const aliasReserva = 'reserva';

// ============================================================================

export type IReservaQueryBuilderViewOptions = {
  loadUsuario?: IQueryBuilderViewOptionsLoad<IUsuarioQueryBuilderViewOptions>;
  loadAmbiente?: IQueryBuilderViewOptionsLoad<IAmbienteQueryBuilderViewOptions>;
};

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

  static ReservaQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IReservaQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.situacao`,
      `${alias}.motivo`,
      `${alias}.tipo`,
      `${alias}.dataInicio`,
      `${alias}.dataTermino`,
    ]);

    const loadUsuario = getQueryBuilderViewLoadMeta(options.loadUsuario, true, `${alias}_usuario`);

    if (loadUsuario) {
      qb.innerJoin(`${alias}.usuario`, `${loadUsuario.alias}`);
      UsuarioService.UsuarioQueryBuilderView(loadUsuario.alias, qb);
    }

    const loadAmbiente = getQueryBuilderViewLoadMeta(options.loadAmbiente, true, `${alias}_ambiente`);

    if (loadAmbiente) {
      qb.innerJoin(`${alias}.ambiente`, `${loadAmbiente.alias}`);
      AmbienteService.AmbienteQueryBuilderView(loadAmbiente.alias, qb, loadAmbiente.options);
    }
  }

  //

  async reservaFindAll(clientAccess: IClientAccess, dto?: Dtos.ISearchInputDto): Promise<Dtos.IReservaFindAllResultDto> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await clientAccess.applyFilter('reserva:find', qb, aliasReserva, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
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
        "ambiente.id": [FilterOperator.EQ],
        "ambiente.bloco.id": [FilterOperator.EQ],
        "ambiente.bloco.campus.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    ReservaService.ReservaQueryBuilderView(aliasReserva, qb, {});

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async reservaFindById(clientAccess: IClientAccess, dto: Dtos.IReservaFindOneByIdInputDto): Promise<Dtos.IReservaFindOneResultDto | null> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await clientAccess.applyFilter('reserva:find', qb, aliasReserva, null);

    // =========================================================

    qb.andWhere(`${aliasReserva}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    ReservaService.ReservaQueryBuilderView(aliasReserva, qb, {});

    // =========================================================

    const reserva = await qb.getOne();

    // =========================================================

    return reserva;
  }

  async reservaFindByIdStrict(clientAccess: IClientAccess, dto: Dtos.IReservaFindOneByIdInputDto) {
    const reserva = await this.reservaFindById(clientAccess, dto);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  async reservaFindByIdSimple(
    clientAccess: IClientAccess,
    id: Dtos.IReservaFindOneByIdInputDto['id'],
    options?: IReservaQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.IReservaFindOneResultDto | null> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await clientAccess.applyFilter('reserva:find', qb, aliasReserva, null);

    // =========================================================

    qb.andWhere(`${aliasReserva}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    ReservaService.ReservaQueryBuilderView(aliasReserva, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const reserva = await qb.getOne();

    // =========================================================

    return reserva;
  }

  async reservaFindByIdSimpleStrict(clientAccess: IClientAccess, id: Dtos.IReservaFindOneByIdInputDto['id'], options?: IReservaQueryBuilderViewOptions, selection?: string[]) {
    const reserva = await this.reservaFindByIdSimple(clientAccess, id, options, selection);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  //

  async reservaCreate(clientAccess: IClientAccess, dto: Dtos.IReservaInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('reserva:create', { dto });

    // =========================================================

    const dtoReserva = pick(dto, ['situacao', 'motivo', 'tipo', 'dataInicio', 'dataTermino']);

    const reserva = this.reservaRepository.create();

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    // =========================================================

    const ambiente = await this.ambienteService.ambienteFindByIdStrict(clientAccess, { id: dto.ambiente.id });

    this.reservaRepository.merge(reserva, {
      ambiente: {
        id: ambiente.id,
      },
    });

    // =========================================================

    const usuario = await this.usuarioService.usuarioFindByIdStrict(clientAccess, { id: dto.usuario.id });

    this.reservaRepository.merge(reserva, {
      usuario: {
        id: usuario.id,
      },
    });

    // =========================================================

    await this.reservaRepository.save(reserva);

    // =========================================================

    return this.reservaFindByIdStrict(clientAccess, { id: reserva.id });
  }

  async reservaUpdate(clientAccess: IClientAccess, dto: Dtos.IReservaUpdateDto) {
    // =========================================================

    const currentReserva = await this.reservaFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    // =========================================================

    await clientAccess.ensureCanReach('reserva:update', { dto }, this.reservaRepository.createQueryBuilder(aliasReserva), dto.id);

    const dtoReserva = pick(dto, ['situacao', 'motivo', 'tipo', 'dataInicio', 'dataTermino']);

    const reserva = <ReservaEntity>{
      id: currentReserva.id,
    };

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    // =========================================================

    if (has(dto, 'ambiente') && dto.ambiente !== undefined) {
      const ambiente = await this.ambienteService.ambienteFindByIdStrict(clientAccess, { id: dto.ambiente.id });

      this.reservaRepository.merge(reserva, {
        ambiente: {
          id: ambiente.id,
        },
      });
    }

    // =========================================================

    if (has(dto, 'usuario') && dto.usuario !== undefined) {
      const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(clientAccess, dto.usuario.id);

      this.reservaRepository.merge(reserva, {
        usuario: {
          id: usuario.id,
        },
      });
    }

    // =========================================================

    await this.reservaRepository.save(reserva);

    // =========================================================

    return this.reservaFindByIdStrict(clientAccess, { id: reserva.id });
  }

  //

  async reservaDeleteOneById(clientAccess: IClientAccess, dto: Dtos.IReservaDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('reserva:delete', { dto }, this.reservaRepository.createQueryBuilder(aliasReserva), dto.id);

    // =========================================================

    const reserva = await this.reservaFindByIdStrict(clientAccess, dto);

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
