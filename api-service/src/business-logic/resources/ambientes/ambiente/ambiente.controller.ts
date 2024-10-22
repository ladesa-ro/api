import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AmbienteService } from "./ambiente.service";

@ApiTags("Ambientes")
@Controller("/ambientes")
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @Get("/")
  @PocOperation(PocTokens.AmbienteList)
  async ambienteFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteListCombinedInput,
  ): Promise<LadesaTypings.AmbienteListCombinedSuccessOutput["body"]> {
    return this.ambienteService.ambienteFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.AmbienteFindOneByID)
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
  @PocOperation(PocTokens.AmbienteCreate)
  async ambienteCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteCreateCombinedInput,
  ) {
    return this.ambienteService.ambienteCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.AmbienteUpdateOneByID)
  async ambienteUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteUpdateByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @PocOperation(PocTokens.AmbienteGetImagemCapa)
  async ambienteGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.ambienteService.ambienteGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @PocOperation(PocTokens.AmbienteSetImagemCapa)
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
  @PocOperation(PocTokens.AmbienteDeleteOneByID)
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
