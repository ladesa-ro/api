import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ReservaService } from "./reserva.service";

@ApiTags("Reservas")
@Controller("/reservas")
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  //

  @Get("/")
  @PocOperation(PocTokens.ReservaList)
  async reservaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaListCombinedInput,
  ): Promise<LadesaTypings.ReservaListCombinedSuccessOutput["body"]> {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.ReservaFindOneByID)
  async reservaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaFindByIDCombinedInput,
  ) {
    return this.reservaService.reservaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.ReservaCreate)
  async reservaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaCreateCombinedInput,
  ) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.ReservaUpdateOneByID)
  async reservaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaUpdateByIDCombinedInput,
  ) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.ReservaDeleteOneByID)
  async reservaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaDeleteByIDCombinedInput,
  ) {
    return this.reservaService.reservaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
