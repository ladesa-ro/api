import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
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
    @CombinedInput() dto: PocTypings.ReservaListOperationInput,
  ): Promise<PocTypings.ReservaListCombinedSuccessOutput["body"]> {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.ReservaFindOneById)
  async reservaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ReservaFindOneByIdOperationInput,
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
    @CombinedInput() dto: PocTypings.ReservaCreateOperationInput,
  ) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.ReservaUpdateOneById)
  async reservaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ReservaUpdateByIdOperationInput,
  ) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.ReservaDeleteOneById)
  async reservaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ReservaDeleteByIDCombinedInput,
  ) {
    return this.reservaService.reservaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
