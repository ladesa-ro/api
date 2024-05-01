import { Injectable, NotFoundException } from '@nestjs/common';
import * as Dtos from '@sisgea/spec';
import { AppResource, AppResourceView } from '@/legacy/utils/qbEfficientLoad';
import { map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import type { IContextoDeAcesso } from '../../../../domain';
import { getPaginateQueryFromSearchInput, getPaginatedResultDto } from '../../../../infraestrutura';
import { DatabaseContextService } from '../../../../infraestrutura/integracao-banco-de-dados/database-context/database-context.service';
import { BlocoEntity } from '../../../../infraestrutura/integracao-banco-de-dados/typeorm/entities/ambientes/bloco.entity';
import { paginateConfig } from '../../../../infraestrutura/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { ArquivoService } from '../../base/arquivo/arquivo.service';
import { IImagemQueryBuilderViewOptions, ImagemService } from '../../base/imagem/imagem.service';
import { CampusService, ICampusQueryBuilderViewOptions } from '../campus/campus.service';

// ============================================================================

const aliasBloco = 'bloco';

// ============================================================================

export type IBlocoQueryBuilderViewOptions = {
  loadCampus?: IQueryBuilderViewOptionsLoad<ICampusQueryBuilderViewOptions>;
  loadImagemCapa?: IQueryBuilderViewOptionsLoad<IImagemQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class BlocoService {
  constructor(
    private campusService: CampusService,
    private databaseContext: DatabaseContextService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  get blocoRepository() {
    return this.databaseContext.blocoRepository;
  }

  //

  static BlocoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IBlocoQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
      `${alias}.codigo`,
    ]);

    const loadCampus = getQueryBuilderViewLoadMeta(options.loadCampus, true, `${alias}_campus`);

    if (loadCampus) {
      qb.leftJoin(`${alias}.campus`, `${loadCampus.alias}`);
      CampusService.CampusQueryBuilderView(loadCampus.alias, qb, loadCampus.options);
    }

    const loadImagemCapa = getQueryBuilderViewLoadMeta(options.loadImagemCapa, true, `${alias}_imagemCapa`);

    if (loadImagemCapa) {
      qb.leftJoin(`${alias}.imagemCapa`, `${loadImagemCapa.alias}`);
      AppResourceView(AppResource.IMAGEM, qb, loadImagemCapa.alias);
    }
  }

  //

  async blocoFindAll(contextoDeAcesso: IContextoDeAcesso, dto?: Dtos.ISearchInputDto): Promise<Dtos.IBlocoFindAllResultDto> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('bloco:find', qb, aliasBloco, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        'codigo',
        'dateCreated',
        //
        'campus.id',
        'campus.razaoSocial',
        'campus.nomeFantasia',
      ],
      relations: {
        campus: true,
      },
      sortableColumns: [
        //
        'nome',
        'codigo',
        'dateCreated',
        //
        'campus.id',
        'campus.razaoSocial',
        'campus.nomeFantasia',
      ],
      searchableColumns: [
        //
        'id',
        //
        'nome',
        'codigo',
        //
      ],
      defaultSortBy: [
        ['nome', 'ASC'],
        ['dateCreated', 'ASC'],
      ],
      filterableColumns: {
        'campus.id': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    BlocoService.BlocoQueryBuilderView(aliasBloco, qb, { loadCampus: true });

    // =========================================================
    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);
    // =========================================================

    return getPaginatedResultDto(paginated);
  }

  async blocoFindById(contextoDeAcesso: IContextoDeAcesso | null, dto: Dtos.IBlocoFindOneByIdInputDto): Promise<Dtos.IBlocoFindOneResultDto | null> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    if (contextoDeAcesso) {
      await contextoDeAcesso.aplicarFiltro('bloco:find', qb, aliasBloco, null);
    }

    // =========================================================

    qb.andWhere(`${aliasBloco}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    BlocoService.BlocoQueryBuilderView(aliasBloco, qb, {
      loadCampus: true,
    });

    // =========================================================

    const bloco = await qb.getOne();

    // =========================================================

    return bloco;
  }

  async blocoFindByIdStrict(contextoDeAcesso: IContextoDeAcesso | null, dto: Dtos.IBlocoFindOneByIdInputDto) {
    const bloco = await this.blocoFindById(contextoDeAcesso, dto);

    if (!bloco) {
      throw new NotFoundException();
    }

    return bloco;
  }

  async blocoFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: Dtos.IBlocoFindOneByIdInputDto['id'],
    options?: IBlocoQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.IBlocoFindOneResultDto | null> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('bloco:find', qb, aliasBloco, null);

    // =========================================================

    qb.andWhere(`${aliasBloco}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    BlocoService.BlocoQueryBuilderView(aliasBloco, qb, {
      loadCampus: false,
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const bloco = await qb.getOne();

    // =========================================================

    return bloco;
  }

  async blocoFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: Dtos.IBlocoFindOneByIdInputDto['id'], options?: IBlocoQueryBuilderViewOptions, selection?: string[]) {
    const bloco = await this.blocoFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!bloco) {
      throw new NotFoundException();
    }

    return bloco;
  }

  //

  async blocoGetImagemCapa(contextoDeAcesso: IContextoDeAcesso | null, id: string) {
    const bloco = await this.blocoFindByIdStrict(contextoDeAcesso, { id: id });

    if (bloco.imagemCapa) {
      const [imagemArquivo] = bloco.imagemCapa.imagemArquivo;

      if (imagemArquivo) {
        const { arquivo } = imagemArquivo;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async blocoUpdateImagemCapa(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IBlocoFindOneByIdInputDto, file: Express.Multer.File) {
    // =========================================================

    const currentBloco = await this.blocoFindByIdStrict(contextoDeAcesso, { id: dto.id });

    // =========================================================

    await contextoDeAcesso.ensurePermission('bloco:update', { dto: { id: currentBloco.id } }, currentBloco.id, this.blocoRepository.createQueryBuilder(aliasBloco));

    // =========================================================

    const { imagem } = await this.imagemService.saveBlocoCapa(file);

    const bloco = <BlocoEntity>{
      id: currentBloco.id,
    };

    this.blocoRepository.merge(bloco, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.blocoRepository.save(bloco);

    // =========================================================

    return true;
  }

  //

  async blocoCreate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IBlocoInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('bloco:create', { dto });

    // =========================================================

    const dtoBloco = pick(dto, ['nome', 'codigo']);

    const bloco = this.blocoRepository.create();

    this.blocoRepository.merge(bloco, {
      ...dtoBloco,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(contextoDeAcesso, dto.campus.id);

    this.blocoRepository.merge(bloco, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    await this.blocoRepository.save(bloco);

    // =========================================================

    return this.blocoFindByIdStrict(contextoDeAcesso, { id: bloco.id });
  }

  async blocoUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IBlocoUpdateDto) {
    // =========================================================

    const currentBloco = await this.blocoFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('bloco:update', { dto }, dto.id, this.blocoRepository.createQueryBuilder(aliasBloco));

    // =========================================================

    const dtoBloco = pick(dto, ['nome', 'codigo']);

    const bloco = <BlocoEntity>{
      id: currentBloco.id,
    };

    this.blocoRepository.merge(bloco, {
      ...dtoBloco,
    });

    // =========================================================

    await this.blocoRepository.save(bloco);

    // =========================================================

    return this.blocoFindByIdStrict(contextoDeAcesso, { id: bloco.id });
  }

  //

  async blocoDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.IBlocoDeleteOneByIdInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('bloco:delete', { dto }, dto.id, this.blocoRepository.createQueryBuilder(aliasBloco));

    // =========================================================

    const bloco = await this.blocoFindByIdStrict(contextoDeAcesso, dto);

    // =========================================================

    if (bloco) {
      await this.blocoRepository
        .createQueryBuilder(aliasBloco)
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
