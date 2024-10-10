import { type AccessContext, AccessContextHttp } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CursoService } from "./curso.service";

@ApiTags("Cursos")
@Controller("/cursos")
export class CursoController {
  constructor(private cursoService: CursoService) {}

  //

  @Get("/")
  @Operation(LadesaTypings.Tokens.Curso.Operations.List)
  async cursoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoListCombinedInput,
  ): Promise<LadesaTypings.CursoListCombinedSuccessOutput["body"]> {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.Curso.Operations.FindById)
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
  @Operation(LadesaTypings.Tokens.Curso.Operations.Create)
  async cursoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoCreateCombinedInput,
  ) {
    return this.cursoService.cursoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.Curso.Operations.UpdateById)
  async cursoUpdate(@AccessContextHttp() accessContext: AccessContext, @CombinedInput() dto: LadesaTypings.CursoUpdateByIDCombinedInput) {
    return this.cursoService.cursoUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @Operation(LadesaTypings.Tokens.Curso.Operations.GetCoverImage)
  async cursoGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.cursoService.cursoGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @Operation(LadesaTypings.Tokens.Curso.Operations.SetCoverImage)
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
  @Operation(LadesaTypings.Tokens.Curso.Operations.DeleteById)
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
