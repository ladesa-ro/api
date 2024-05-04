import { AppResource, AppResourceView } from '@/legacy/utils/qbEfficientLoad';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as Spec from '@sisgea/spec';
import { map, pick } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import { busca, getPaginatedResultDto } from '../../../busca';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { DisciplinaEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta, paginateConfig } from '../../../legacy/utils';
import { ArquivoService } from '../../base/arquivo/arquivo.service';
import { IImagemQueryBuilderViewOptions, ImagemService } from '../../base/imagem/imagem.service';

// ============================================================================

const aliasDisciplina = 'disciplina';

// ============================================================================

export type IDisciplinaQueryBuilderViewOptions = {
  loadImagemCapa?: IQueryBuilderViewOptionsLoad<IImagemQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class DisciplinaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  get disciplinaRepository() {
    return this.databaseContext.disciplinaRepository;
  }

  //

  static DisciplinaQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IDisciplinaQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
      `${alias}.cargaHoraria`,
    ]);

    const loadImagemCapa = getQueryBuilderViewLoadMeta(options.loadImagemCapa, true, `${alias}_imagemCapa`);

    if (loadImagemCapa) {
      qb.leftJoin(`${alias}.imagemCapa`, `${loadImagemCapa.alias}`);
      AppResourceView(AppResource.IMAGEM, qb, loadImagemCapa.alias);
    }
  }

  //

  async disciplinaFindAll(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IPaginatedInputDto | null = null): Promise<Spec.IDisciplinaFindAllResultDto> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('disciplina:find', qb, aliasDisciplina, null);

    // =========================================================

    const paginated = await busca('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        'cargaHoraria',
        //
      ],
      sortableColumns: [
        //
        'nome',
        'cargaHoraria',
      ],
      searchableColumns: [
        //
        'id',
        //
        'nome',
        'cargaHoraria',
        //
      ],
      defaultSortBy: [
        //
        ['nome', 'ASC'],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);

    DisciplinaService.DisciplinaQueryBuilderView(aliasDisciplina, qb, {});

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return getPaginatedResultDto(paginated);
  }

  async disciplinaFindById(contextoDeAcesso: IContextoDeAcesso | null, dto: Spec.IDisciplinaFindOneByIdInputDto): Promise<Spec.IDisciplinaFindOneResultDto | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    if (contextoDeAcesso) {
      await contextoDeAcesso.aplicarFiltro('disciplina:find', qb, aliasDisciplina, null);
    }

    // =========================================================

    qb.andWhere(`${aliasDisciplina}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    DisciplinaService.DisciplinaQueryBuilderView(aliasDisciplina, qb, {});

    // =========================================================

    const disciplina = await qb.getOne();

    // =========================================================

    return disciplina;
  }

  async disciplinaFindByIdStrict(contextoDeAcesso: IContextoDeAcesso | null, dto: Spec.IDisciplinaFindOneByIdInputDto) {
    const disciplina = await this.disciplinaFindById(contextoDeAcesso, dto);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  async disciplinaFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: Spec.IDisciplinaFindOneByIdInputDto['id'],
    options?: IDisciplinaQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Spec.IDisciplinaFindOneResultDto | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('disciplina:find', qb, aliasDisciplina, null);

    // =========================================================

    qb.andWhere(`${aliasDisciplina}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    DisciplinaService.DisciplinaQueryBuilderView(aliasDisciplina, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const disciplina = await qb.getOne();

    // =========================================================

    return disciplina;
  }

  async disciplinaFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: Spec.IDisciplinaFindOneByIdInputDto['id'], options?: IDisciplinaQueryBuilderViewOptions, selection?: string[]) {
    const disciplina = await this.disciplinaFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  //

  async disciplinaCreate(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IDisciplinaInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('disciplina:create', { dto });

    // =========================================================

    const dtoDisciplina = pick(dto, ['nome', 'cargaHoraria']);

    const disciplina = this.disciplinaRepository.create();

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    // =========================================================

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return this.disciplinaFindByIdStrict(contextoDeAcesso, { id: disciplina.id });
  }

  async disciplinaUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IDisciplinaUpdateDto) {
    // =========================================================

    const currentDisciplina = await this.disciplinaFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('disciplina:update', { dto }, dto.id, this.disciplinaRepository.createQueryBuilder(aliasDisciplina));

    const dtoDisciplina = pick(dto, ['nome', 'cargaHoraria']);

    const disciplina = {
      id: currentDisciplina.id,
    } as DisciplinaEntity;

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    // =========================================================

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return this.disciplinaFindByIdStrict(contextoDeAcesso, { id: disciplina.id });
  }

  //

  async disciplinaGetImagemCapa(contextoDeAcesso: IContextoDeAcesso | null, id: string) {
    const disciplina = await this.disciplinaFindByIdStrict(contextoDeAcesso, { id: id });

    if (disciplina.imagemCapa) {
      const [imagemArquivo] = disciplina.imagemCapa.imagemArquivo;

      if (imagemArquivo) {
        const { arquivo } = imagemArquivo;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async disciplinaUpdateImagemCapa(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IDisciplinaFindOneByIdInputDto, file: Express.Multer.File) {
    // =========================================================

    const currentDisciplina = await this.disciplinaFindByIdStrict(contextoDeAcesso, { id: dto.id });

    // =========================================================

    await contextoDeAcesso.ensurePermission(
      'disciplina:update',
      {
        dto: {
          id: currentDisciplina.id,
        },
      },
      currentDisciplina.id,
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveDisciplinaCapa(file);

    const disciplina = this.disciplinaRepository.merge(this.disciplinaRepository.create(), {
      id: currentDisciplina.id,
    });

    this.disciplinaRepository.merge(disciplina, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return true;
  }

  //

  async disciplinaDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IDisciplinaDeleteOneByIdInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('disciplina:delete', { dto }, dto.id, this.disciplinaRepository.createQueryBuilder(aliasDisciplina));

    // =========================================================

    const disciplina = await this.disciplinaFindByIdStrict(contextoDeAcesso, dto);

    // =========================================================

    if (disciplina) {
      await this.disciplinaRepository
        .createQueryBuilder(aliasDisciplina)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :disciplinaId', { disciplinaId: disciplina.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
