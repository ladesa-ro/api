import { type AccessContext, AccessContextHttp } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DisciplinaService } from "./disciplina.service";

@ApiTags("Disciplinas")
@Controller("/disciplinas")
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  //

  @Get("/")
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.List)
  async disciplinaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaListCombinedInput,
  ): Promise<LadesaTypings.DisciplinaListCombinedSuccessOutput["body"]> {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.FindById)
  async disciplinaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaFindByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.Create)
  async disciplinaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaCreateCombinedInput,
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.UpdateById)
  async disciplinaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaUpdateByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.GetCoverImage)
  async disciplinaGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.disciplinaService.disciplinaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.SetCoverImage)
  async disciplinaImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.disciplinaService.disciplinaUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.DeleteById)
  async disciplinaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaDeleteByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
