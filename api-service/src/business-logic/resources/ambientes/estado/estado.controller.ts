import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EstadoService } from "./estado.service";

@ApiTags("Estados")
@Controller("/base/estados")
export class EstadoController {
  constructor(private estadoService: EstadoService) {}

  @Get("/")
  @PocOperation(PocTokens.EstadoList)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EstadoListCombinedInput,
  ): Promise<LadesaTypings.EstadoListCombinedSuccessOutput["body"]> {
    return this.estadoService.findAll(accessContext, dto);
  }

  @Get("/:id")
  @PocOperation(PocTokens.EstadoFindOneByID)
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EstadoFindByIDCombinedInput,
  ) {
    return this.estadoService.findByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
}
