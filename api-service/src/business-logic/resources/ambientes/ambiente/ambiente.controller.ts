import { type AccessContext, AccessContextHttp } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AmbienteService } from "./ambiente.service";

@ApiTags("Ambientes")
@Controller("/ambientes")
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @Get("/")
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.List)
  async ambienteFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteListCombinedInput,
  ): Promise<LadesaTypings.AmbienteListCombinedSuccessOutput["body"]> {
    return this.ambienteService.ambienteFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.FindById)
  async ambienteFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteFindByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  @Post("/")
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.Create)
  async ambienteCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteCreateCombinedInput,
  ) {
    return this.ambienteService.ambienteCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.UpdateById)
  async ambienteUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteUpdateByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.GetCoverImage)
  async ambienteGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.ambienteService.ambienteGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.SetCoverImage)
  async ambienteImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.ambienteService.ambienteUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.DeleteById)
  async ambienteDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteDeleteByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
