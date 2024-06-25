import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';
import { AccessContext } from '../../../access-context';
import { DatabaseContextService } from '../../../adapters/adapter-database';
import { DiarioEntity } from '../../../adapters/adapter-database/typeorm/entities';
import { paginateConfig } from '../../../fixtures';
import { QbEfficientLoad } from '../../../fixtures/ladesa-spec/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../fixtures/ladesa-spec/search/search-strategies';
import { AmbienteService } from '../../ambientes/ambiente/ambiente.service';
import { CalendarioLetivoService } from '../../calendario/calendario-letivo/calendario-letivo.service';
import { DisciplinaService } from '../../ensino/disciplina/disciplina.service';
import { TurmaService } from '../../ensino/turma/turma.service';

// ============================================================================

const aliasDiario = 'diario';

// ============================================================================

@Injectable()
export class DiarioService {
  constructor(
    private calendarioLetivoService: CalendarioLetivoService,
    private databaseContext: DatabaseContextService,
    private turmaService: TurmaService,
    private disciplinaService: DisciplinaService,
    private ambienteService: AmbienteService,
  ) {}

  get diarioRepository() {
    return this.databaseContext.diarioRepository;
  }

  //

  async diarioFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.DiarioListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DiarioListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await accessContext.aplicarFiltro('diario:find', qb, aliasDiario, null);

    // =========================================================

    const paginated = await LadesaSearch('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'ativo',
        //
        'turma.id',
        'turma.periodo',
        'disciplina.id',
        'disciplina.nome',
        'ambientePadrao.id',
        'ambientePadrao.nome',
        //
      ],
      sortableColumns: [
        //
        'ativo',
        //
        'disciplina.nome',
        'ambientePadrao.nome',
      ],
      relations: {
        turma: true,
        disciplina: true,
        ambientePadrao: true,
      },
      searchableColumns: [
        //
        'id',
        //
        'ativo',
        'ano',
        'etapa',
        'turma.periodo',
        'disciplina.nome',
        //
      ],
      defaultSortBy: [],
      filterableColumns: {
        'turma.id': [FilterOperator.EQ],
        'disciplina.id': [FilterOperator.EQ],
        'ambientePadrao.id': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Diario.Views.FindOneResult, qb, aliasDiario, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async diarioFindById(accessContext: AccessContext, dto: LadesaTypings.DiarioFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.DiarioFindOneResult | null> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await accessContext.aplicarFiltro('diario:find', qb, aliasDiario, null);

    // =========================================================

    qb.andWhere(`${aliasDiario}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Diario.Views.FindOneResult, qb, aliasDiario, selection);

    // =========================================================

    const diario = await qb.getOne();

    // =========================================================

    return diario;
  }

  async diarioFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.DiarioFindOneInput, selection?: string[] | boolean) {
    const diario = await this.diarioFindById(accessContext, dto, selection);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  async diarioFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.DiarioFindOneInput['id'], selection?: string[] | boolean): Promise<LadesaTypings.DiarioFindOneResult | null> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await accessContext.aplicarFiltro('diario:find', qb, aliasDiario, null);

    // =========================================================

    qb.andWhere(`${aliasDiario}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Diario.Views.FindOneResult, qb, aliasDiario, selection);

    // =========================================================

    const diario = await qb.getOne();

    // =========================================================

    return diario;
  }

  async diarioFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.DiarioFindOneInput['id'], selection?: string[] | boolean) {
    const diario = await this.diarioFindByIdSimple(accessContext, id, selection);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  //

  async diarioCreate(accessContext: AccessContext, dto: LadesaTypings.DiarioCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission('diario:create', { dto });

    // =========================================================

    const dtoDiario = pick(dto.body, ['ativo']);

    const diario = this.diarioRepository.create();

    this.diarioRepository.merge(diario, {
      ativo: true,
      ...dtoDiario,
    });

    // =========================================================

    if (dto.body.ambientePadrao !== null) {
      const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.body.ambientePadrao.id });
      this.diarioRepository.merge(diario, { ambientePadrao: { id: ambientePadrao.id } });
    } else {
      this.diarioRepository.merge(diario, { ambientePadrao: null });
    }

    // =========================================================

    const calendarioLetivo = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.body.calendarioLetivo.id);
    this.diarioRepository.merge(diario, { calendarioLetivo: { id: calendarioLetivo.id } });

    // =========================================================

    const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(accessContext, dto.body.disciplina.id);

    this.diarioRepository.merge(diario, { disciplina: { id: disciplina.id } });

    // =========================================================

    const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.body.turma.id);

    this.diarioRepository.merge(diario, { turma: { id: turma.id } });

    // =========================================================

    await this.diarioRepository.save(diario);

    // =========================================================

    return this.diarioFindByIdStrict(accessContext, { id: diario.id });
  }

  async diarioUpdate(accessContext: AccessContext, dto: LadesaTypings.DiarioUpdateByIDCombinedInput) {
    // =========================================================

    const currentDiario = await this.diarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission('diario:update', { dto }, dto.params.id, this.diarioRepository.createQueryBuilder(aliasDiario));

    const dtoDiario = pick(dto.body, ['ativo', 'ano', 'etapa', 'turma', 'disciplina', 'ambientePadrao']);

    const diario = {
      id: currentDiario.id,
    } as DiarioEntity;

    this.diarioRepository.merge(diario, {
      ...dtoDiario,
    });

    // =========================================================

    if (has(dto.body, 'ambientePadrao') && dto.body.ambientePadrao !== undefined) {
      if (dto.body.ambientePadrao !== null) {
        const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.body.ambientePadrao.id });

        this.diarioRepository.merge(diario, { ambientePadrao: { id: ambientePadrao.id } });
      } else {
        this.diarioRepository.merge(diario, { ambientePadrao: null });
      }
    }

    // =========================================================

    if (has(dto.body, 'disciplina') && dto.body.disciplina !== undefined) {
      const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(accessContext, dto.body.disciplina.id);

      this.diarioRepository.merge(diario, { disciplina: { id: disciplina.id } });
    }

    // =========================================================

    if (has(dto.body, 'turma') && dto.body.turma !== undefined) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.body.turma.id);
      this.diarioRepository.merge(diario, { turma: { id: turma.id } });
    }

    // =========================================================

    if (has(dto.body, 'calendarioLetivo') && dto.body.calendarioLetivo !== undefined) {
      const calendarioLetivo = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.body.calendarioLetivo.id);
      this.diarioRepository.merge(diario, { calendarioLetivo: { id: calendarioLetivo.id } });
    }

    // =========================================================

    await this.diarioRepository.save(diario);

    // =========================================================

    return this.diarioFindByIdStrict(accessContext, { id: diario.id });
  }

  //

  async diarioDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.DiarioFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission('diario:delete', { dto }, dto.id, this.diarioRepository.createQueryBuilder(aliasDiario));

    // =========================================================

    const diario = await this.diarioFindByIdStrict(accessContext, dto);

    // =========================================================

    if (diario) {
      await this.diarioRepository
        .createQueryBuilder(aliasDiario)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :diarioId', { diarioId: diario.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
