import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CursoService } from "./curso.service";

@ApiTags("Cursos")
@Controller("/cursos")
export class CursoController {
  constructor(private cursoService: CursoService) {}

  //

  @Get("/")
  @PocOperation(PocTokens.CursoList)
  async cursoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoListCombinedInput,
  ): Promise<LadesaTypings.CursoListCombinedSuccessOutput["body"]> {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.CursoFindOneByID)
  async cursoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoFindByIDCombinedInput,
  ) {
    return this.cursoService.cursoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.CursoCreate)
  async cursoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoCreateCombinedInput,
  ) {
    return this.cursoService.cursoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.CursoUpdateOneByID)
  async cursoUpdate(@AccessContextHttp() accessContext: AccessContext, @CombinedInput() dto: LadesaTypings.CursoUpdateByIDCombinedInput) {
    return this.cursoService.cursoUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @PocOperation(PocTokens.CursoGetImagemCapa)
  async cursoGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.cursoService.cursoGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @PocOperation(PocTokens.CursoSetImagemCapa)
  async cursoImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.cursoService.cursoUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.CursoDeleteOneByID)
  async cursoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoFindByIDCombinedInput,
  ) {
    return this.cursoService.cursoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
