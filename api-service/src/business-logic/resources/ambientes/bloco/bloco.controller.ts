import { type AccessContext, AccessContextHttp } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BlocoService } from "./bloco.service";

@ApiTags("Blocos")
@Controller("/blocos")
export class BlocoController {
  constructor(private blocoService: BlocoService) {}

  //

  @Get("/")
  @Operation(LadesaTypings.Tokens.Bloco.Operations.List)
  async blocoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: LadesaTypings.BlocoListCombinedInput,
  ): Promise<LadesaTypings.BlocoListCombinedSuccessOutput["body"]> {
    return this.blocoService.blocoFindAll(accessContext, combinedInput);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.Bloco.Operations.FindById)
  async blocoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoFindByIdStrict(accessContext, { id });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.Bloco.Operations.Create)
  async blocoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: LadesaTypings.BlocoCreateCombinedInput,
  ) {
    return this.blocoService.blocoCreate(accessContext, combinedInput);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.Bloco.Operations.UpdateById)
  async blocoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: LadesaTypings.BlocoUpdateByIDCombinedInput,
  ) {
    return this.blocoService.blocoUpdate(accessContext, combinedInput);
  }

  //

  @Get("/:id/imagem/capa")
  @Operation(LadesaTypings.Tokens.Bloco.Operations.GetCoverImage)
  async blocoGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @Operation(LadesaTypings.Tokens.Bloco.Operations.SetCoverImage)
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
  @Operation(LadesaTypings.Tokens.Bloco.Operations.DeleteById)
  async blocoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: LadesaTypings.BlocoDeleteByIDCombinedInput,
  ) {
    return this.blocoService.blocoDeleteOneById(accessContext, {
      id: combinedInput.params.id,
    });
  }

  //
}
