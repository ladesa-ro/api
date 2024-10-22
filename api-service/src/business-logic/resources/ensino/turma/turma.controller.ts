import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TurmaService } from "./turma.service";

@ApiTags("Turmas")
@Controller("/turmas")
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  //

  @Get("/")
  @PocOperation(PocTokens.TurmaList)
  async turmaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaListCombinedInput,
  ): Promise<LadesaTypings.TurmaListCombinedSuccessOutput["body"]> {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.TurmaFindOneByID)
  async turmaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaFindByIDCombinedInput,
  ) {
    return this.turmaService.turmaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.TurmaCreate)
  async turmaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaCreateCombinedInput,
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.TurmaUpdateOneByID)
  async turmaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaUpdateByIDCombinedInput,
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @PocOperation(PocTokens.TurmaGetImagemCapa)
  async turmaGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.turmaService.turmaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @PocOperation(PocTokens.TurmaSetImagemCapa)
  async turmaImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.turmaService.turmaUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.TurmaDeleteOneByID)
  async turmaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDeleteByIDCombinedInput,
  ) {
    return this.turmaService.turmaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
