import { Injectable, NotFoundException } from '@nestjs/common';
import * as Dtos from '@sisgea/spec';
import { AppResource, AppResourceView } from 'application/utils/qbEfficientLoad';
import { has, map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../../domain';
import { getPaginateQueryFromSearchInput, getPaginatedResultDto } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { TurmaEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ensino/turma.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { AmbienteService, IAmbienteQueryBuilderViewOptions } from '../../ambientes/ambiente/ambiente.service';
import { ArquivoService } from '../../base/arquivo/arquivo.service';
import { IImagemQueryBuilderViewOptions, ImagemService } from '../../base/imagem/imagem.service';
import { CursoService, ICursoQueryBuilderViewOptions } from '../curso/curso.service';

// ============================================================================

const aliasTurma = 'turma';

// ============================================================================

export type ITurmaQueryBuilderViewOptions = {
  loadCurso?: IQueryBuilderViewOptionsLoad<ICursoQueryBuilderViewOptions>;
  loadAmbientePadraoAula?: IQueryBuilderViewOptionsLoad<IAmbienteQueryBuilderViewOptions>;
  loadImagemCapa?: IQueryBuilderViewOptionsLoad<IImagemQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class TurmaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private ambienteService: AmbienteService,
    private cursoService: CursoService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  get turmaRepository() {
    return this.databaseContext.turmaRepository;
  }

  //

  static TurmaQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: ITurmaQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.periodo`,
      `${alias}.grupo`,
      `${alias}.nome`,
    ]);

    const loadCurso = getQueryBuilderViewLoadMeta(options.loadCurso, true, `${alias}_c`);

    if (loadCurso) {
      qb.innerJoin(`${alias}.curso`, `${loadCurso.alias}`);
      CursoService.CursoQueryBuilderView(loadCurso.alias, qb, loadCurso.options);
    }

    const loadAmbientePadraoAula = getQueryBuilderViewLoadMeta(options.loadAmbientePadraoAula, true, `${alias}_apa`);

    if (loadAmbientePadraoAula) {
      qb.leftJoin(`${alias}.ambientePadraoAula`, `${loadAmbientePadraoAula.alias}`);
      AmbienteService.AmbienteQueryBuilderView(loadAmbientePadraoAula.alias, qb, loadAmbientePadraoAula.options);
    }

    const loadImagemCapa = getQueryBuilderViewLoadMeta(options.loadImagemCapa, true, `${alias}_ic`);

    if (loadImagemCapa) {
      qb.leftJoin(`${alias}.imagemCapa`, `${loadImagemCapa.alias}`);
      AppResourceView(AppResource.IMAGEM, qb, loadImagemCapa.alias);
    }
  }

  //

  async turmaFindAll(contextoDeAcesso: IContextoDeAcesso, dto?: Dtos.ISearchInputDto): Promise<Dtos.ITurmaFindAllResultDto> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('turma:find', qb, aliasTurma, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'periodo',
        'grupo',
        'nome',

        //
      ],
      sortableColumns: [
        //
        'periodo',
        'grupo',
        'nome',
        //
        'ambientePadraoAula.nome',
        'ambientePadraoAula.descricao',
        'ambientePadraoAula.codigo',
        'ambientePadraoAula.capacidade',
        'ambientePadraoAula.tipo',
        //
        'curso.nome',
        'curso.nomeAbreviado',
        'curso.campus.id',
        'curso.modalidade.id',
        'curso.modalidade.nome',
      ],
      relations: {
        curso: {
          campus: true,
        },
        ambientePadraoAula: true,
      },
      searchableColumns: [
        //
        'id',
        //
        'periodo',
        'grupo',
        'nome',
        //
      ],
      defaultSortBy: [
        //
        ['nome', 'ASC'],
      ],
      filterableColumns: {
        //
        'ambientePadraoAula.nome': [FilterOperator.EQ],
        'ambientePadraoAula.codigo': [FilterOperator.EQ],
        'ambientePadraoAula.capacidade': [FilterOperator.EQ, FilterOperator.GT, FilterOperator.GTE, FilterOperator.LT, FilterOperator.LTE],
        'ambientePadraoAula.tipo': [FilterOperator.EQ],
        //
        'curso.nome': [FilterOperator.EQ],
        'curso.nomeAbreviado': [FilterOperator.EQ],
        'curso.campus.id': [FilterOperator.EQ],
        'curso.modalidade.id': [FilterOperator.EQ],
        'curso.modalidade.nome': [FilterOperator.EQ],
        'curso.modalidade.slug': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    TurmaService.TurmaQueryBuilderView(aliasTurma, qb, {});

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return getPaginatedResultDto(paginated);
  }

  async turmaFindById(contextoDeAcesso: IContextoDeAcesso | null, dto: Dtos.ITurmaFindOneByIdInputDto): Promise<Dtos.ITurmaFindOneResultDto | null> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    if (contextoDeAcesso) {
      await contextoDeAcesso.aplicarFiltro('turma:find', qb, aliasTurma, null);
    }

    // =========================================================

    qb.andWhere(`${aliasTurma}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    TurmaService.TurmaQueryBuilderView(aliasTurma, qb, {});

    // =========================================================

    const turma = await qb.getOne();

    // =========================================================

    return turma;
  }

  async turmaFindByIdStrict(contextoDeAcesso: IContextoDeAcesso | null, dto: Dtos.ITurmaFindOneByIdInputDto) {
    const turma = await this.turmaFindById(contextoDeAcesso, dto);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  async turmaFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: Dtos.ITurmaFindOneByIdInputDto['id'],
    options?: ITurmaQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.ITurmaFindOneResultDto | null> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('turma:find', qb, aliasTurma, null);

    // =========================================================

    qb.andWhere(`${aliasTurma}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    TurmaService.TurmaQueryBuilderView(aliasTurma, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const turma = await qb.getOne();

    // =========================================================

    return turma;
  }

  async turmaFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: Dtos.ITurmaFindOneByIdInputDto['id'], options?: ITurmaQueryBuilderViewOptions, selection?: string[]) {
    const turma = await this.turmaFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  //

  async turmaCreate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.ITurmaInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('turma:create', { dto });

    // =========================================================

    const dtoTurma = pick(dto, ['periodo', 'grupo', 'nome']);

    const turma = this.turmaRepository.create();

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    // =========================================================

    if (dto.ambientePadraoAula !== null) {
      const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id: dto.ambientePadraoAula.id });

      this.turmaRepository.merge(turma, {
        ambientePadraoAula: {
          id: ambientePadraoAula.id,
        },
      });
    } else {
      this.turmaRepository.merge(turma, {
        ambientePadraoAula: null,
      });
    }

    // =========================================================

    const curso = await this.cursoService.cursoFindByIdSimpleStrict(contextoDeAcesso, dto.curso.id);

    this.turmaRepository.merge(turma, {
      curso: {
        id: curso.id,
      },
    });

    // =========================================================

    await this.turmaRepository.save(turma);

    // =========================================================

    return this.turmaFindByIdStrict(contextoDeAcesso, { id: turma.id });
  }

  async turmaUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.ITurmaUpdateDto) {
    // =========================================================

    const currentTurma = await this.turmaFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('turma:update', { dto }, dto.id, this.turmaRepository.createQueryBuilder(aliasTurma));

    const dtoTurma = pick(dto, ['periodo', 'grupo', 'nome']);

    const turma = <TurmaEntity>{
      id: currentTurma.id,
    };

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    // =========================================================

    if (has(dto, 'ambientePadraoAula') && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id: dto.ambientePadraoAula.id });

        this.turmaRepository.merge(turma, {
          ambientePadraoAula: {
            id: ambientePadraoAula.id,
          },
        });
      } else {
        this.turmaRepository.merge(turma, {
          ambientePadraoAula: null,
        });
      }
    }

    // =========================================================

    if (has(dto, 'curso') && dto.curso !== undefined) {
      const curso = await this.cursoService.cursoFindByIdSimpleStrict(contextoDeAcesso, dto.curso.id);

      this.turmaRepository.merge(turma, {
        curso: {
          id: curso.id,
        },
      });
    }

    // =========================================================

    await this.turmaRepository.save(turma);

    // =========================================================

    return this.turmaFindByIdStrict(contextoDeAcesso, { id: turma.id });
  }

  //

  async turmaGetImagemCapa(contextoDeAcesso: IContextoDeAcesso | null, id: string) {
    const turma = await this.turmaFindByIdStrict(contextoDeAcesso, { id: id });

    if (turma.imagemCapa) {
      const [imagemArquivo] = turma.imagemCapa.imagemArquivo;

      if (imagemArquivo) {
        const { arquivo } = imagemArquivo;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async turmaUpdateImagemCapa(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.ITurmaFindOneByIdInputDto, file: Express.Multer.File) {
    // =========================================================

    const currentTurma = await this.turmaFindByIdStrict(contextoDeAcesso, { id: dto.id });

    // =========================================================

    await contextoDeAcesso.ensurePermission(
      'turma:update',
      {
        dto: {
          id: currentTurma.id,
        },
      },
      currentTurma.id,
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveTurmaCapa(file);

    const turma = this.turmaRepository.merge(this.turmaRepository.create(), {
      id: currentTurma.id,
    });

    this.turmaRepository.merge(turma, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.turmaRepository.save(turma);

    // =========================================================

    return true;
  }

  //

  async turmaDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Dtos.ITurmaDeleteOneByIdInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('turma:delete', { dto }, dto.id, this.turmaRepository.createQueryBuilder(aliasTurma));

    // =========================================================

    const turma = await this.turmaFindByIdStrict(contextoDeAcesso, dto);

    // =========================================================

    if (turma) {
      await this.turmaRepository
        .createQueryBuilder(aliasTurma)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :turmaId', { turmaId: turma.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
