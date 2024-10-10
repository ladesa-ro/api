import type { AccessContext } from "@/access-context";
import { QbEfficientLoad } from "@/business-logic/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/business-logic/standards/ladesa-spec/search/search-strategies";
import { DatabaseContextService } from "@/infrastructure/adapters/adapter-database";
import type { DisciplinaEntity } from "@/infrastructure/adapters/adapter-database/typeorm/entities";
import { paginateConfig } from "@/infrastructure/fixtures";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import { ArquivoService } from "../../base/arquivo/arquivo.service";
import { ImagemService } from "../../base/imagem/imagem.service";

// ============================================================================

const aliasDisciplina = "disciplina";

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

  async disciplinaFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.DisciplinaListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DisciplinaListCombinedSuccessOutput["body"]> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await accessContext.aplicarFiltro("disciplina:find", qb, aliasDisciplina, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nome",
        "nomeAbreviado",
        "cargaHoraria",
        //
      ],
      sortableColumns: [
        //
        "nome",
        "cargaHoraria",
      ],
      searchableColumns: [
        //
        "id",
        //
        "nome",
        "nomeAbreviado",
        "cargaHoraria",
        //
      ],
      defaultSortBy: [
        //
        ["nome", "ASC"],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Disciplina.Views.FindOneResult, qb, aliasDisciplina, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async disciplinaFindById(accessContext: AccessContext | null, dto: LadesaTypings.DisciplinaFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.DisciplinaFindOneResult | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    if (accessContext) {
      await accessContext.aplicarFiltro("disciplina:find", qb, aliasDisciplina, null);
    }

    // =========================================================

    qb.andWhere(`${aliasDisciplina}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Disciplina.Views.FindOneResult, qb, aliasDisciplina, selection);

    // =========================================================

    const disciplina = await qb.getOne();

    // =========================================================

    return disciplina;
  }

  async disciplinaFindByIdStrict(accessContext: AccessContext | null, dto: LadesaTypings.DisciplinaFindOneInput, selection?: string[] | boolean) {
    const disciplina = await this.disciplinaFindById(accessContext, dto, selection);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  async disciplinaFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.DisciplinaFindOneInput["id"], selection?: string[] | boolean): Promise<LadesaTypings.DisciplinaFindOneResult | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await accessContext.aplicarFiltro("disciplina:find", qb, aliasDisciplina, null);

    // =========================================================

    qb.andWhere(`${aliasDisciplina}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Disciplina.Views.FindOneResult, qb, aliasDisciplina, selection);

    // =========================================================

    const disciplina = await qb.getOne();

    // =========================================================

    return disciplina;
  }

  async disciplinaFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.DisciplinaFindOneInput["id"], selection?: string[]) {
    const disciplina = await this.disciplinaFindByIdSimple(accessContext, id, selection);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  //

  async disciplinaCreate(accessContext: AccessContext, dto: LadesaTypings.DisciplinaCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission("disciplina:create", { dto });

    // =========================================================

    const dtoDisciplina = pick(dto.body, ["nome", "nomeAbreviado", "cargaHoraria"]);

    const disciplina = this.disciplinaRepository.create();

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    // =========================================================

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return this.disciplinaFindByIdStrict(accessContext, { id: disciplina.id });
  }

  async disciplinaUpdate(accessContext: AccessContext, dto: LadesaTypings.DisciplinaUpdateByIDCombinedInput) {
    // =========================================================

    const currentDisciplina = await this.disciplinaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("disciplina:update", { dto }, dto.params.id, this.disciplinaRepository.createQueryBuilder(aliasDisciplina));

    const dtoDisciplina = pick(dto.body, ["nome", "nomeAbreviado", "cargaHoraria"]);

    const disciplina = {
      id: currentDisciplina.id,
    } as DisciplinaEntity;

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    // =========================================================

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return this.disciplinaFindByIdStrict(accessContext, { id: disciplina.id });
  }

  //

  async disciplinaGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const disciplina = await this.disciplinaFindByIdStrict(accessContext, {
      id: id,
    });

    if (disciplina.imagemCapa) {
      const [versao] = disciplina.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async disciplinaUpdateImagemCapa(accessContext: AccessContext, dto: LadesaTypings.DisciplinaFindOneInput, file: Express.Multer.File) {
    // =========================================================

    const currentDisciplina = await this.disciplinaFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission(
      "disciplina:update",
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

  async disciplinaDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.DisciplinaFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("disciplina:delete", { dto }, dto.id, this.disciplinaRepository.createQueryBuilder(aliasDisciplina));

    // =========================================================

    const disciplina = await this.disciplinaFindByIdStrict(accessContext, dto);

    // =========================================================

    if (disciplina) {
      await this.disciplinaRepository
        .createQueryBuilder(aliasDisciplina)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :disciplinaId", { disciplinaId: disciplina.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
