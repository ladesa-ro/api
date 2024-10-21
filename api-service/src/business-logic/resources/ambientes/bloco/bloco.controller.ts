import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BlocoService } from "./bloco.service";

@ApiTags("Blocos")
@Controller("/blocos")
export class BlocoController {
  constructor(private blocoService: BlocoService) {}

  //

  @Get("/")
  @PocOperation(PocTokens.BlocoList)
  async blocoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: PocTypings.BlocoListOperationInput,
  ): Promise<PocTypings.BlocoListCombinedSuccessOutput["body"]> {
    return this.blocoService.blocoFindAll(accessContext, combinedInput);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.BlocoFindOneById)
  async blocoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoFindByIdStrict(accessContext, { id });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.BlocoCreate)
  async blocoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: PocTypings.BlocoCreateOperationInput,
  ) {
    return this.blocoService.blocoCreate(accessContext, combinedInput);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.BlocoUpdateOneById)
  async blocoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: PocTypings.BlocoUpdateByIdOperationInput,
  ) {
    return this.blocoService.blocoUpdate(accessContext, combinedInput);
  }

  //

  @Get("/:id/imagem/capa")
  @PocOperation(PocTokens.BlocoGetImagemCapa)
  async blocoGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @PocOperation(PocTokens.BlocoSetImagemCapa)
  async blocoImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.BlocoDeleteOneById)
  async blocoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: PocTypings.BlocoDeleteByIDCombinedInput,
  ) {
    return this.blocoService.blocoDeleteOneById(accessContext, {
      id: combinedInput.params.id,
    });
  }

  //
}
