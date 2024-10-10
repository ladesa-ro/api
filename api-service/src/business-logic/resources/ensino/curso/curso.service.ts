import { QbEfficientLoad } from "@/business-logic/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/business-logic/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { CursoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CampusService } from "../../ambientes/campus/campus.service";
import { ArquivoService } from "../../base/arquivo/arquivo.service";
import { ImagemService } from "../../base/imagem/imagem.service";
import { ModalidadeService } from "../modalidade/modalidade.service";

// ============================================================================

const aliasCurso = "curso";

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

  async cursoFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.CursoListCombinedInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.CursoListCombinedSuccessOutput["body"]> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    await accessContext.aplicarFiltro("curso:find", qb, aliasCurso, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nome",
        "nomeAbreviado",
        "campus",
        "modalidade",
        //
      ],
      sortableColumns: [
        //
        "nome",
        "nomeAbreviado",
        //
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        //
        "modalidade.id",
        "modalidade.nome",
        "modalidade.slug",
      ],
      searchableColumns: [
        //
        "id",
        //
        "nome",
        "nomeAbreviado",
        "campus",
        "modalidade",
        //
      ],
      relations: {
        campus: true,
        modalidade: true,
      },
      defaultSortBy: [
        //
        ["nome", "ASC"],
      ],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
        "campus.cnpj": [FilterOperator.EQ],
        "campus.razaoSocial": [FilterOperator.EQ],
        "campus.nomeFantasia": [FilterOperator.EQ],
        "modalidade.id": [FilterOperator.EQ],
        "modalidade.nome": [FilterOperator.EQ],
        "modalidade.slug": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Curso.Views.FindOneResult, qb, aliasCurso, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async cursoFindById(accessContext: AccessContext | null, dto: LadesaTypings.CursoFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.CursoFindOneResult | null> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    if (accessContext) {
      await accessContext.aplicarFiltro("curso:find", qb, aliasCurso, null);
    }

    // =========================================================

    qb.andWhere(`${aliasCurso}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Curso.Views.FindOneResult, qb, aliasCurso, selection);

    // =========================================================

    const curso = await qb.getOne();

    // =========================================================

    return curso;
  }

  async cursoFindByIdStrict(accessContext: AccessContext | null, dto: LadesaTypings.CursoFindOneInput, selection?: string[] | boolean) {
    const curso = await this.cursoFindById(accessContext, dto, selection);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  async cursoFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.CursoFindOneInput["id"], selection?: string[]): Promise<LadesaTypings.CursoFindOneResult | null> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    await accessContext.aplicarFiltro("curso:find", qb, aliasCurso, null);

    // =========================================================

    qb.andWhere(`${aliasCurso}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Curso.Views.FindOneResult, qb, aliasCurso, selection);

    // =========================================================

    const curso = await qb.getOne();

    // =========================================================

    return curso;
  }

  async cursoFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.CursoFindOneInput["id"], selection?: string[]) {
    const curso = await this.cursoFindByIdSimple(accessContext, id, selection);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  //

  async cursoCreate(accessContext: AccessContext, dto: LadesaTypings.CursoCreateCombinedInput) {
    // =========================================================

    await accessContext.ensurePermission("curso:create", { dto });

    // =========================================================

    const dtoCurso = pick(dto.body, ["nome", "nomeAbreviado"]);

    const curso = this.cursoRepository.create();

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.body.campus.id);

    this.cursoRepository.merge(curso, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(accessContext, dto.body.modalidade.id);

    this.cursoRepository.merge(curso, {
      modalidade: {
        id: modalidade.id,
      },
    });

    // =========================================================

    await this.cursoRepository.save(curso);

    // =========================================================

    return this.cursoFindByIdStrict(accessContext, { id: curso.id });
  }

  async cursoUpdate(accessContext: AccessContext, dto: LadesaTypings.CursoUpdateByIDCombinedInput) {
    // =========================================================

    const currentCurso = await this.cursoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("curso:update", { dto }, dto.params.id, this.cursoRepository.createQueryBuilder(aliasCurso));

    const dtoCurso = pick(dto.body, ["nome", "nomeAbreviado", "campus", "modalidade"]);

    const curso = {
      id: currentCurso.id,
    } as CursoEntity;

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    // =========================================================

    if (has(dto.body, "campus") && dto.body.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.body.campus.id);

      this.cursoRepository.merge(curso, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (has(dto.body, "modalidade") && dto.body.modalidade !== undefined) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(accessContext, dto.body.modalidade.id);

      this.cursoRepository.merge(curso, {
        modalidade: {
          id: modalidade.id,
        },
      });
    }

    // =========================================================

    await this.cursoRepository.save(curso);

    // =========================================================

    return this.cursoFindByIdStrict(accessContext, { id: curso.id });
  }

  //

  async cursoGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const curso = await this.cursoFindByIdStrict(accessContext, { id: id });

    if (curso.imagemCapa) {
      const [versao] = curso.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async cursoUpdateImagemCapa(accessContext: AccessContext, dto: LadesaTypings.CursoFindOneInput, file: Express.Multer.File) {
    // =========================================================

    const currentCurso = await this.cursoFindByIdStrict(accessContext, {
      id: dto.id,
    });

    // =========================================================

    await accessContext.ensurePermission(
      "curso:update",
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

  async cursoDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.CursoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("curso:delete", { dto }, dto.id, this.cursoRepository.createQueryBuilder(aliasCurso));

    // =========================================================

    const curso = await this.cursoFindByIdStrict(accessContext, dto);

    // =========================================================

    if (curso) {
      await this.cursoRepository
        .createQueryBuilder(aliasCurso)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :cursoId", { cursoId: curso.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
