import { Injectable, NotFoundException } from '@nestjs/common';
import { map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { AmbienteEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ambientes/ambiente.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { BlocoService, IBlocoQueryBuilderViewOptions } from '../bloco/bloco.service';
import { ICampusQueryBuilderViewOptions } from '../campus/campus.service';
import { ImagemService } from '../../base/imagem/imagem.service';

// ============================================================================

const aliasAmbiente = 'ambiente';

// ============================================================================

export type IAmbienteQueryBuilderViewOptions = {
  loadBloco?: IQueryBuilderViewOptionsLoad<IBlocoQueryBuilderViewOptions>;
  loadImagemCapa?: IQueryBuilderViewOptionsLoad<ICampusQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class AmbienteService {
  constructor(
    private blocoService: BlocoService,
    private databaseContext: DatabaseContextService,
  ) {}

  get ambienteRepository() {
    return this.databaseContext.ambienteRepository;
  }

  //

  static AmbienteQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IAmbienteQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      //
      `${alias}.nome`,
      `${alias}.descricao`,
      `${alias}.codigo`,
      `${alias}.capacidade`,
      `${alias}.tipo`,
    ]);

    const loadBloco = getQueryBuilderViewLoadMeta(options.loadBloco, true, `${alias}_bloco`);

    if (loadBloco) {
      qb.leftJoin(`${alias}.bloco`, `${loadBloco.alias}`);
      BlocoService.BlocoQueryBuilderView(loadBloco.alias, qb, loadBloco.options);
    }

    const loadImagemCapa = getQueryBuilderViewLoadMeta(options.loadImagemCapa, true, `${alias}_imagemCapa`);

    if (loadImagemCapa) {
      qb.leftJoin(`${alias}.imagemCapa`, `${loadImagemCapa.alias}`);
      ImagemService.ImagemQueryBuilderView(loadImagemCapa.alias, qb, loadImagemCapa.options);
    }
  }

  //

  async ambienteFindAll(contextoDeAcesso: IContextoDeAcesso, dto?: Dtos.ISearchInputDto): Promise<Dtos.IAmbienteFindAllResultDto> {
    // =========================================================

    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('ambiente:find', qb, aliasAmbiente, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        'descricao',
        'codigo',
        'capacidade',
        'tipo',
        'dateCreated',
        //
        'bloco.id',
        'bloco.campus.id',
      ],
      relations: {
        bloco: {
          campus: true,
        },
      },
      sortableColumns: [
        //
        'nome',
        'descricao',
        'codigo',
        'capacidade',
        'tipo',
        //
        'dateCreated',
        //
        'bloco.id',
        'bloco.campus.id',
      ],
      searchableColumns: [
        //
        'id',
        //
        'nome',
        'descricao',
        'codigo',
        'capacidade',
        'tipo',
        //
      ],
      defaultSortBy: [
        ['bloco.campus.id', 'ASC'],
        ['bloco.id', 'ASC'],
        ['codigo', 'ASC'],
        ['nome', 'ASC'],
        ['dateCreated', 'ASC'],
      ],
      filterableColumns: {
        'bloco.id': [FilterOperator.EQ],
        'bloco.campus.id': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    AmbienteService.AmbienteQueryBuilderView(aliasAmbiente, qb, {
      loadBloco: true,
    });

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async ambienteFindById(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IAmbienteFindOneByIdInputDto): Promise<Dtos.IAmbienteFindOneResultDto | null> {
    // =========================================================

    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('ambiente:find', qb, aliasAmbiente, null);

    // =========================================================

    qb.andWhere(`${aliasAmbiente}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    AmbienteService.AmbienteQueryBuilderView(aliasAmbiente, qb, {
      loadBloco: true,
    });

    // =========================================================

    const ambiente = await qb.getOne();

    // =========================================================

    return ambiente;
  }

  async ambienteFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IAmbienteFindOneByIdInputDto) {
    const ambiente = await this.ambienteFindById(contextoDeAcesso, dto);

    if (!ambiente) {
      throw new NotFoundException();
    }

    return ambiente;
  }

  //

  async ambienteCreate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IAmbienteInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('ambiente:create', { dto });

    // =========================================================

    const dtoAmbiente = pick(dto, ['nome', 'descricao', 'codigo', 'capacidade', 'tipo']);

    const ambiente = this.ambienteRepository.create();

    this.ambienteRepository.merge(ambiente, {
      ...dtoAmbiente,
    });

    // =========================================================

    const bloco = await this.blocoService.blocoFindByIdSimpleStrict(contextoDeAcesso, dto.bloco.id);

    this.ambienteRepository.merge(ambiente, {
      bloco: {
        id: bloco.id,
      },
    });

    // =========================================================

    await this.ambienteRepository.save(ambiente);

    // =========================================================

    return this.ambienteFindByIdStrict(contextoDeAcesso, { id: ambiente.id });
  }

  async ambienteUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IAmbienteUpdateDto) {
    // =========================================================

    const currentAmbiente = await this.ambienteFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('ambiente:update', { dto }, dto.id, this.ambienteRepository.createQueryBuilder(aliasAmbiente));

    const dtoAmbiente = pick(dto, ['nome', 'descricao', 'codigo', 'capacidade', 'tipo']);

    const ambiente = <AmbienteEntity>{
      id: currentAmbiente.id,
    };

    this.ambienteRepository.merge(ambiente, {
      ...dtoAmbiente,
    });

    // =========================================================

    await this.ambienteRepository.save(ambiente);

    // =========================================================

    return this.ambienteFindByIdStrict(contextoDeAcesso, { id: ambiente.id });
  }

  //

  async ambienteDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IAmbienteDeleteOneByIdInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('ambiente:delete', { dto }, dto.id, this.ambienteRepository.createQueryBuilder(aliasAmbiente));

    // =========================================================

    const bloco = await this.ambienteFindByIdStrict(contextoDeAcesso, dto);

    // =========================================================

    if (bloco) {
      await this.ambienteRepository
        .createQueryBuilder(aliasAmbiente)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :blocoId', { blocoId: bloco.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
