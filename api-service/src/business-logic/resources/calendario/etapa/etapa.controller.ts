import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EtapaService } from "./etapa.service";

@ApiTags("Etapas")
@Controller("/etapas")
export class EtapaController {
  constructor(private etapaService: EtapaService) {}

  @Get("/")
  @PocOperation(PocTokens.EtapaList)
  async etapaFindAll(@AccessContextHttp() clientAccess: AccessContext, @CombinedInput() dto: LadesaTypings.EtapaListCombinedInput): Promise<LadesaTypings.EtapaListCombinedSuccessOutput["body"]> {
    return this.etapaService.etapaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.EtapaFindOneByID)
  async etapaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaFindByIDCombinedInput,
  ) {
    return this.etapaService.etapaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.EtapaCreate)
  async etapaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaCreateCombinedInput,
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.EtapaUpdateOneByID)
  async etapaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaUpdateByIDCombinedInput,
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.EtapaDeleteOneByID)
  async etapaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaDeleteByIDCombinedInput,
  ) {
    return this.etapaService.etapaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
