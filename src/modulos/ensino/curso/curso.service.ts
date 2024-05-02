import { AppResource, AppResourceView } from '@/legacy/utils/qbEfficientLoad';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as Spec from '@sisgea/spec';
import { has, map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { CursoEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { getPaginateQueryFromSearchInput, getPaginatedResultDto } from '../../../legacy';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta, paginateConfig } from '../../../legacy/utils';
import { CampusService, ICampusQueryBuilderViewOptions } from '../../ambientes/campus/campus.service';
import { ArquivoService } from '../../base/arquivo/arquivo.service';
import { IImagemQueryBuilderViewOptions, ImagemService } from '../../base/imagem/imagem.service';
import { ModalidadeService } from '../modalidade/modalidade.service';

// ============================================================================

const aliasCurso = 'curso';

// ============================================================================

export type ICursoQueryBuilderViewOptions = {
  loadCampus?: IQueryBuilderViewOptionsLoad<ICampusQueryBuilderViewOptions>;
  loadImagemCapa?: IQueryBuilderViewOptionsLoad<IImagemQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class CursoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private modalidadeService: ModalidadeService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  get cursoRepository() {
    return this.databaseContext.cursoRepository;
  }

  //

  static CursoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: ICursoQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
      `${alias}.nomeAbreviado`,
    ]);

    const loadCampus = getQueryBuilderViewLoadMeta(options.loadCampus, true, `${alias}_campus`);

    if (loadCampus) {
      qb.innerJoin(`${alias}.campus`, `${loadCampus.alias}`);
      CampusService.CampusQueryBuilderView(loadCampus.alias, qb, loadCampus.options);
    }

    qb.leftJoin(`${alias}.modalidade`, `${alias}_modalidade`);
    AppResourceView(AppResource.MODALIDADE, qb, `${alias}_modalidade`);

    const loadImagemCapa = getQueryBuilderViewLoadMeta(options.loadImagemCapa, true, `${alias}_imagemCapa`);

    if (loadImagemCapa) {
      qb.leftJoin(`${alias}.imagemCapa`, `${loadImagemCapa.alias}`);
      AppResourceView(AppResource.IMAGEM, qb, loadImagemCapa.alias);
    }
  }

  //

  async cursoFindAll(contextoDeAcesso: IContextoDeAcesso, dto?: Spec.ISearchInputDto): Promise<Spec.ICursoFindAllResultDto> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('curso:find', qb, aliasCurso, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        'nomeAbreviado',
        'campus',
        'modalidade',
        //
      ],
      sortableColumns: [
        //
        'nome',
        'nomeAbreviado',
        //
        'campus.id',
        'campus.cnpj',
        'campus.razaoSocial',
        'campus.nomeFantasia',
        //
        'modalidade.id',
        'modalidade.nome',
        'modalidade.slug',
      ],
      searchableColumns: [
        //
        'id',
        //
        'nome',
        'nomeAbreviado',
        'campus',
        'modalidade',
        //
      ],
      relations: {
        campus: true,
        modalidade: true,
      },
      defaultSortBy: [
        //
        ['nome', 'ASC'],
      ],
      filterableColumns: {
        'campus.id': [FilterOperator.EQ],
        'campus.cnpj': [FilterOperator.EQ],
        'campus.razaoSocial': [FilterOperator.EQ],
        'campus.nomeFantasia': [FilterOperator.EQ],
        'modalidade.id': [FilterOperator.EQ],
        'modalidade.nome': [FilterOperator.EQ],
        'modalidade.slug': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    CursoService.CursoQueryBuilderView(aliasCurso, qb, {});

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return getPaginatedResultDto(paginated);
  }

  async cursoFindById(contextoDeAcesso: IContextoDeAcesso | null, dto: Spec.ICursoFindOneByIdInputDto): Promise<Spec.ICursoFindOneResultDto | null> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    if (contextoDeAcesso) {
      await contextoDeAcesso.aplicarFiltro('curso:find', qb, aliasCurso, null);
    }

    // =========================================================

    qb.andWhere(`${aliasCurso}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    CursoService.CursoQueryBuilderView(aliasCurso, qb, {});

    // =========================================================

    const curso = await qb.getOne();

    // =========================================================

    return curso;
  }

  async cursoFindByIdStrict(contextoDeAcesso: IContextoDeAcesso | null, dto: Spec.ICursoFindOneByIdInputDto) {
    const curso = await this.cursoFindById(contextoDeAcesso, dto);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  async cursoFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: Spec.ICursoFindOneByIdInputDto['id'],
    options?: ICursoQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Spec.ICursoFindOneResultDto | null> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('curso:find', qb, aliasCurso, null);

    // =========================================================

    qb.andWhere(`${aliasCurso}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    CursoService.CursoQueryBuilderView(aliasCurso, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const curso = await qb.getOne();

    // =========================================================

    return curso;
  }

  async cursoFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: Spec.ICursoFindOneByIdInputDto['id'], options?: ICursoQueryBuilderViewOptions, selection?: string[]) {
    const curso = await this.cursoFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  //

  async cursoCreate(contextoDeAcesso: IContextoDeAcesso, dto: Spec.ICursoInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('curso:create', { dto });

    // =========================================================

    const dtoCurso = pick(dto, ['nome', 'nomeAbreviado']);

    const curso = this.cursoRepository.create();

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(contextoDeAcesso, dto.campus.id);

    this.cursoRepository.merge(curso, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(contextoDeAcesso, dto.modalidade.id);

    this.cursoRepository.merge(curso, {
      modalidade: {
        id: modalidade.id,
      },
    });

    // =========================================================

    await this.cursoRepository.save(curso);

    // =========================================================

    return this.cursoFindByIdStrict(contextoDeAcesso, { id: curso.id });
  }

  async cursoUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Spec.ICursoUpdateDto) {
    // =========================================================

    const currentCurso = await this.cursoFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('curso:update', { dto }, dto.id, this.cursoRepository.createQueryBuilder(aliasCurso));

    const dtoCurso = pick(dto, ['nome', 'nomeAbreviado', 'campus', 'modalidade']);

    const curso = {
      id: currentCurso.id,
    } as CursoEntity;

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    // =========================================================

    if (has(dto, 'campus') && dto.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(contextoDeAcesso, dto.campus.id);

      this.cursoRepository.merge(curso, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (has(dto, 'modalidade') && dto.modalidade !== undefined) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(contextoDeAcesso, dto.modalidade.id);

      this.cursoRepository.merge(curso, {
        modalidade: {
          id: modalidade.id,
        },
      });
    }

    // =========================================================

    await this.cursoRepository.save(curso);

    // =========================================================

    return this.cursoFindByIdStrict(contextoDeAcesso, { id: curso.id });
  }

  //

  async cursoGetImagemCapa(contextoDeAcesso: IContextoDeAcesso | null, id: string) {
    const curso = await this.cursoFindByIdStrict(contextoDeAcesso, { id: id });

    if (curso.imagemCapa) {
      const [imagemArquivo] = curso.imagemCapa.imagemArquivo;

      if (imagemArquivo) {
        const { arquivo } = imagemArquivo;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async cursoUpdateImagemCapa(contextoDeAcesso: IContextoDeAcesso, dto: Spec.ICursoFindOneByIdInputDto, file: Express.Multer.File) {
    // =========================================================

    const currentCurso = await this.cursoFindByIdStrict(contextoDeAcesso, { id: dto.id });

    // =========================================================

    await contextoDeAcesso.ensurePermission(
      'curso:update',
      {
        dto: {
          id: currentCurso.id,
        },
      },
      currentCurso.id,
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveCursoCapa(file);

    const curso = this.cursoRepository.merge(this.cursoRepository.create(), {
      id: currentCurso.id,
    });

    this.cursoRepository.merge(curso, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.cursoRepository.save(curso);

    // =========================================================

    return true;
  }

  //

  async cursoDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Spec.ICursoDeleteOneByIdInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('curso:delete', { dto }, dto.id, this.cursoRepository.createQueryBuilder(aliasCurso));

    // =========================================================

    const curso = await this.cursoFindByIdStrict(contextoDeAcesso, dto);

    // =========================================================

    if (curso) {
      await this.cursoRepository
        .createQueryBuilder(aliasCurso)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :cursoId', { cursoId: curso.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
