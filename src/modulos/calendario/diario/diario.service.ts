import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator } from 'nestjs-paginate';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { QbEfficientLoad } from '../../../helpers/ladesa/QbEfficientLoad';
import { LadesaPaginatedResultDto, LadesaSearch } from '../../../helpers/ladesa/search/search-strategies';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { DiarioEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { paginateConfig } from '../../../legacy/utils';
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
    contextoDeAcesso: IContextoDeAcesso,
    dto: LadesaTypings.DiarioListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DiarioListCombinedSuccessOutput['body']> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('diario:find', qb, aliasDiario, null);

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

  async diarioFindById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.DiarioFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.DiarioFindOneResult | null> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('diario:find', qb, aliasDiario, null);

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

  async diarioFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.DiarioFindOneInput, selection?: string[] | boolean) {
    const diario = await this.diarioFindById(contextoDeAcesso, dto, selection);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  async diarioFindByIdSimple(contextoDeAcesso: IContextoDeAcesso, id: LadesaTypings.DiarioFindOneInput['id'], selection?: string[] | boolean): Promise<LadesaTypings.DiarioFindOneResult | null> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('diario:find', qb, aliasDiario, null);

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

  async diarioFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: LadesaTypings.DiarioFindOneInput['id'], selection?: string[] | boolean) {
    const diario = await this.diarioFindByIdSimple(contextoDeAcesso, id, selection);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  //

  async diarioCreate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.DiarioCreateCombinedInput) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('diario:create', { dto });

    // =========================================================

    const dtoDiario = pick(dto.body, ['ativo']);

    const diario = this.diarioRepository.create();

    this.diarioRepository.merge(diario, {
      ativo: true,
      ...dtoDiario,
    });

    // =========================================================

    if (dto.body.ambientePadrao !== null) {
      const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id: dto.body.ambientePadrao.id });
      this.diarioRepository.merge(diario, { ambientePadrao: { id: ambientePadrao.id } });
    } else {
      this.diarioRepository.merge(diario, { ambientePadrao: null });
    }

    // =========================================================

    const calendarioLetivo = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(contextoDeAcesso, dto.body.calendarioLetivo.id);
    this.diarioRepository.merge(diario, { calendarioLetivo: { id: calendarioLetivo.id } });

    // =========================================================

    const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(contextoDeAcesso, dto.body.disciplina.id);

    this.diarioRepository.merge(diario, { disciplina: { id: disciplina.id } });

    // =========================================================

    const turma = await this.turmaService.turmaFindByIdSimpleStrict(contextoDeAcesso, dto.body.turma.id);

    this.diarioRepository.merge(diario, { turma: { id: turma.id } });

    // =========================================================

    await this.diarioRepository.save(diario);

    // =========================================================

    return this.diarioFindByIdStrict(contextoDeAcesso, { id: diario.id });
  }

  async diarioUpdate(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.DiarioUpdateByIDCombinedInput) {
    // =========================================================

    const currentDiario = await this.diarioFindByIdStrict(contextoDeAcesso, {
      id: dto.params.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('diario:update', { dto }, dto.params.id, this.diarioRepository.createQueryBuilder(aliasDiario));

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
        const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id: dto.body.ambientePadrao.id });

        this.diarioRepository.merge(diario, { ambientePadrao: { id: ambientePadrao.id } });
      } else {
        this.diarioRepository.merge(diario, { ambientePadrao: null });
      }
    }

    // =========================================================

    if (has(dto.body, 'disciplina') && dto.body.disciplina !== undefined) {
      const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(contextoDeAcesso, dto.body.disciplina.id);

      this.diarioRepository.merge(diario, { disciplina: { id: disciplina.id } });
    }

    // =========================================================

    if (has(dto.body, 'turma') && dto.body.turma !== undefined) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(contextoDeAcesso, dto.body.turma.id);
      this.diarioRepository.merge(diario, { turma: { id: turma.id } });
    }

    // =========================================================

    if (has(dto.body, 'calendarioLetivo') && dto.body.calendarioLetivo !== undefined) {
      const calendarioLetivo = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(contextoDeAcesso, dto.body.calendarioLetivo.id);
      this.diarioRepository.merge(diario, { calendarioLetivo: { id: calendarioLetivo.id } });
    }

    // =========================================================

    await this.diarioRepository.save(diario);

    // =========================================================

    return this.diarioFindByIdStrict(contextoDeAcesso, { id: diario.id });
  }

  //

  async diarioDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.DiarioFindOneInput) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('diario:delete', { dto }, dto.id, this.diarioRepository.createQueryBuilder(aliasDiario));

    // =========================================================

    const diario = await this.diarioFindByIdStrict(contextoDeAcesso, dto);

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
