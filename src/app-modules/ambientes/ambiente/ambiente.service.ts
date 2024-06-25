import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';
import { AccessContext } from '../../../access-context';
import { DatabaseContextService } from '../../../adapters/adapter-database';
import { AmbienteEntity } from '../../../adapters/adapter-database/typeorm/entities';
import { QbEfficientLoad } from '../../../fixtures/ladesa-spec/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../fixtures/ladesa-spec/search/search-strategies';
import { paginateConfig } from '../../../fixtures/utils/paginateConfig';
import { ArquivoService } from '../../base/arquivo/arquivo.service';
import { ImagemService } from '../../base/imagem/imagem.service';
import { BlocoService } from '../bloco/bloco.service';

// ============================================================================

const aliasAmbiente = 'ambiente';

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

  async ambienteFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.AmbienteListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.AmbienteListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    // =========================================================

    await accessContext.aplicarFiltro('ambiente:find', qb, aliasAmbiente, null);

    // =========================================================

    const paginated = await LadesaSearch('/ambientes', dto, qb, {
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

    QbEfficientLoad(LadesaTypings.Tokens.Ambiente.Views.FindOneResult, qb, aliasAmbiente, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async ambienteFindById(accessContext: AccessContext | null, dto: LadesaTypings.AmbienteFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.AmbienteFindOneResult | null> {
    // =========================================================

    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    // =========================================================

    if (accessContext) {
      await accessContext.aplicarFiltro('ambiente:find', qb, aliasAmbiente, null);
    }

    // =========================================================

    qb.andWhere(`${aliasAmbiente}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Ambiente.Views.FindOneResult, qb, aliasAmbiente, selection);

    // =========================================================

    const ambiente = await qb.getOne();

    // =========================================================

    return ambiente;
  }

  async ambienteFindByIdStrict(accessContext: AccessContext | null, dto: LadesaTypings.AmbienteFindOneInput, selection?: string[] | boolean) {
    const ambiente = await this.ambienteFindById(accessContext, dto, selection);

    if (!ambiente) {
      throw new NotFoundException();
    }

    return ambiente;
  }

  //

  async ambienteCreate(accessContext: AccessContext, dto: LadesaTypings.AmbienteCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission('ambiente:create', { dto });

    // =========================================================

    const dtoAmbiente = pick(dto.body, ['nome', 'descricao', 'codigo', 'capacidade', 'tipo']);

    const ambiente = this.ambienteRepository.create();

    this.ambienteRepository.merge(ambiente, {
      ...dtoAmbiente,
    });

    // =========================================================

    const bloco = await this.blocoService.blocoFindByIdSimpleStrict(accessContext, dto.body.bloco.id);

    this.ambienteRepository.merge(ambiente, {
      bloco: {
        id: bloco.id,
      },
    });

    // =========================================================

    await this.ambienteRepository.save(ambiente);

    // =========================================================

    return this.ambienteFindByIdStrict(accessContext, { id: ambiente.id });
  }

  async ambienteUpdate(accessContext: AccessContext, dto: LadesaTypings.AmbienteUpdateByIDCombinedInput) {
    // =========================================================

    const currentAmbiente = await this.ambienteFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission('ambiente:update', { dto }, dto.params.id, this.ambienteRepository.createQueryBuilder(aliasAmbiente));

    const dtoAmbiente = pick(dto.body, ['nome', 'descricao', 'codigo', 'capacidade', 'tipo']);

    const ambiente = {
      id: currentAmbiente.id,
    } as AmbienteEntity;

    this.ambienteRepository.merge(ambiente, {
      ...dtoAmbiente,
    });

    // =========================================================

    await this.ambienteRepository.save(ambiente);

    // =========================================================

    return this.ambienteFindByIdStrict(accessContext, { id: ambiente.id });
  }

  //

  async ambienteGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const ambiente = await this.ambienteFindByIdStrict(accessContext, { id: id });

    if (ambiente.imagemCapa) {
      const [versao] = ambiente.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async ambienteUpdateImagemCapa(accessContext: AccessContext, dto: LadesaTypings.AmbienteFindOneInput, file: Express.Multer.File) {
    // =========================================================

    const currentAmbiente = await this.ambienteFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission(
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

  async ambienteDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.AmbienteFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission('ambiente:delete', { dto }, dto.id, this.ambienteRepository.createQueryBuilder(aliasAmbiente));

    // =========================================================

    const bloco = await this.ambienteFindByIdStrict(accessContext, dto);

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
