import { Injectable, NotFoundException } from '@nestjs/common';
import * as Dtos from '@sisgea/spec';
import { AppResource, AppResourceView } from 'application/utils/qbEfficientLoad';
import { map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import type { IContextoDeAcesso } from '../../../../domain';
import { getPaginateQueryFromSearchInput, getPaginatedResultDto } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { AmbienteEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ambientes/ambiente.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { ArquivoService } from '../../base/arquivo/arquivo.service';
import { IImagemQueryBuilderViewOptions, ImagemService } from '../../base/imagem/imagem.service';
import { BlocoService, IBlocoQueryBuilderViewOptions } from '../bloco/bloco.service';

// ============================================================================

const aliasAmbiente = 'ambiente';

// ============================================================================

export type IAmbienteQueryBuilderViewOptions = {
  loadBloco?: IQueryBuilderViewOptionsLoad<IBlocoQueryBuilderViewOptions>;
  loadImagemCapa?: IQueryBuilderViewOptionsLoad<IImagemQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class AmbienteService {
  constructor(
    private blocoService: BlocoService,
    private databaseContext: DatabaseContextService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
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
      //
      `${alias}.dateCreated`,
      `${alias}.dateUpdated`,
      `${alias}.dateDeleted`,
      //
    ]);

    const loadBloco = getQueryBuilderViewLoadMeta(options.loadBloco, true, `${alias}_bloco`);

    if (loadBloco) {
      qb.leftJoin(`${alias}.bloco`, `${loadBloco.alias}`);
      BlocoService.BlocoQueryBuilderView(loadBloco.alias, qb, loadBloco.options);
    }

    const loadImagemCapa = getQueryBuilderViewLoadMeta(options.loadImagemCapa, true, `${alias}_imagemCapa`);

    if (loadImagemCapa) {
      qb.leftJoin(`${alias}.imagemCapa`, `${loadImagemCapa.alias}`);
      AppResourceView(AppResource.IMAGEM, qb, loadImagemCapa.alias);
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

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return getPaginatedResultDto(paginated);
  }

  async ambienteFindById(contextoDeAcesso: IContextoDeAcesso | null, dto: Dtos.IAmbienteFindOneByIdInputDto): Promise<Dtos.IAmbienteFindOneResultDto | null> {
    // =========================================================

    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    // =========================================================

    if (contextoDeAcesso) {
      await contextoDeAcesso.aplicarFiltro('ambiente:find', qb, aliasAmbiente, null);
    }

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

  async ambienteFindByIdStrict(contextoDeAcesso: IContextoDeAcesso | null, dto: Dtos.IAmbienteFindOneByIdInputDto) {
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

  async ambienteGetImagemCapa(contextoDeAcesso: IContextoDeAcesso | null, id: string) {
    const ambiente = await this.ambienteFindByIdStrict(contextoDeAcesso, { id: id });

    if (ambiente.imagemCapa) {
      const [imagemArquivo] = ambiente.imagemCapa.imagemArquivo;

      if (imagemArquivo) {
        const { arquivo } = imagemArquivo;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async ambienteUpdateImagemCapa(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IBlocoFindOneByIdInputDto, file: Express.Multer.File) {
    // =========================================================

    const currentAmbiente = await this.ambienteFindByIdStrict(contextoDeAcesso, { id: dto.id });

    // =========================================================

    await contextoDeAcesso.ensurePermission(
      'ambiente:update',
      {
        dto: {
          id: currentAmbiente.id,
        },
      },
      currentAmbiente.id,
      this.ambienteRepository.createQueryBuilder(aliasAmbiente),
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveAmbienteCapa(file);

    const ambiente = this.ambienteRepository.merge(this.ambienteRepository.create(), {
      id: currentAmbiente.id,
    });

    this.ambienteRepository.merge(ambiente, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.ambienteRepository.save(ambiente);

    // =========================================================

    return true;
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
