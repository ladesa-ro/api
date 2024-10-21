import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DisciplinaService } from "./disciplina.service";

@ApiTags("Disciplinas")
@Controller("/disciplinas")
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  //

  @Get("/")
  @PocOperation(PocTokens.DisciplinaList)
  async disciplinaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaListCombinedInput,
  ): Promise<LadesaTypings.DisciplinaListCombinedSuccessOutput["body"]> {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.DisciplinaFindOneByID)
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
  @PocOperation(PocTokens.DisciplinaCreate)
  async disciplinaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaCreateCombinedInput,
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.DisciplinaUpdateOneByID)
  async disciplinaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaUpdateByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @PocOperation(PocTokens.DisciplinaGetImagemCapa)
  async disciplinaGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.disciplinaService.disciplinaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @PocOperation(PocTokens.DisciplinaSetImagemCapa)
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
  @PocOperation(PocTokens.DisciplinaDeleteOneByID)
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
