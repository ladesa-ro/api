import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';

import { AccessContext } from '../../../access-context';
import { QbEfficientLoad } from '../../../helpers/ladesa/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../helpers/ladesa/search/search-strategies';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { TurmaEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { paginateConfig } from '../../../legacy/utils';
import { AmbienteService } from '../../ambientes/ambiente/ambiente.service';
import { ArquivoService } from '../../base/arquivo/arquivo.service';
import { ImagemService } from '../../base/imagem/imagem.service';
import { CursoService } from '../curso/curso.service';

// ============================================================================

const aliasTurma = 'turma';

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

  async turmaFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.TurmaListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.TurmaListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    await accessContext.aplicarFiltro('turma:find', qb, aliasTurma, null);

    // =========================================================

    const paginated = await LadesaSearch('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'periodo',
        //
      ],
      sortableColumns: [
        //
        'periodo',
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
        //
      ],
      defaultSortBy: [
        //
        ['periodo', 'ASC'],
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
    QbEfficientLoad(LadesaTypings.Tokens.Turma.Views.FindOneResult, qb, aliasTurma, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async turmaFindById(accessContext: AccessContext | null, dto: LadesaTypings.TurmaFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.TurmaFindOneResult | null> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    if (accessContext) {
      await accessContext.aplicarFiltro('turma:find', qb, aliasTurma, null);
    }

    // =========================================================

    qb.andWhere(`${aliasTurma}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Turma.Views.FindOneResult, qb, aliasTurma, selection);

    // =========================================================

    const turma = await qb.getOne();

    // =========================================================

    return turma;
  }

  async turmaFindByIdStrict(accessContext: AccessContext | null, dto: LadesaTypings.TurmaFindOneInput, selection?: string[] | boolean) {
    const turma = await this.turmaFindById(accessContext, dto, selection);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  async turmaFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.TurmaFindOneInput['id'], selection?: string[]): Promise<LadesaTypings.TurmaFindOneResult | null> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    await accessContext.aplicarFiltro('turma:find', qb, aliasTurma, null);

    // =========================================================

    qb.andWhere(`${aliasTurma}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Turma.Views.FindOneResult, qb, aliasTurma, selection);

    // =========================================================

    const turma = await qb.getOne();

    // =========================================================

    return turma;
  }

  async turmaFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.TurmaFindOneInput['id'], selection?: string[]) {
    const turma = await this.turmaFindByIdSimple(accessContext, id, selection);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  //

  async turmaCreate(accessContext: AccessContext, dto: LadesaTypings.TurmaCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission('turma:create', { dto });

    // =========================================================

    const dtoTurma = pick(dto.body, ['periodo']);

    const turma = this.turmaRepository.create();

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    // =========================================================

    if (dto.body.ambientePadraoAula) {
      const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.body.ambientePadraoAula.id });

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

    const curso = await this.cursoService.cursoFindByIdSimpleStrict(accessContext, dto.body.curso.id);

    this.turmaRepository.merge(turma, {
      curso: {
        id: curso.id,
      },
    });

    // =========================================================

    await this.turmaRepository.save(turma);

    // =========================================================

    return this.turmaFindByIdStrict(accessContext, { id: turma.id });
  }

  async turmaUpdate(accessContext: AccessContext, dto: LadesaTypings.TurmaUpdateByIDCombinedInput) {
    // =========================================================

    const currentTurma = await this.turmaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission('turma:update', { dto }, dto.params.id, this.turmaRepository.createQueryBuilder(aliasTurma));

    const dtoTurma = pick(dto.body, ['periodo']);

    const turma = {
      id: currentTurma.id,
    } as TurmaEntity;

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    // =========================================================

    if (has(dto.body, 'ambientePadraoAula') && dto.body.ambientePadraoAula !== undefined) {
      if (dto.body.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.body.ambientePadraoAula.id });

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

    if (has(dto.body, 'curso') && dto.body.curso !== undefined) {
      const curso = await this.cursoService.cursoFindByIdSimpleStrict(accessContext, dto.body.curso.id);

      this.turmaRepository.merge(turma, {
        curso: {
          id: curso.id,
        },
      });
    }

    // =========================================================

    await this.turmaRepository.save(turma);

    // =========================================================

    return this.turmaFindByIdStrict(accessContext, { id: turma.id });
  }

  //

  async turmaGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const turma = await this.turmaFindByIdStrict(accessContext, { id: id });

    if (turma.imagemCapa) {
      const [versao] = turma.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async turmaUpdateImagemCapa(accessContext: AccessContext, dto: LadesaTypings.TurmaFindOneInput, file: Express.Multer.File) {
    // =========================================================

    const currentTurma = await this.turmaFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission(
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

  async turmaDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.TurmaFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission('turma:delete', { dto }, dto.id, this.turmaRepository.createQueryBuilder(aliasTurma));

    // =========================================================

    const turma = await this.turmaFindByIdStrict(accessContext, dto);

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
