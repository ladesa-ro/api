import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { ReservaService } from "./reserva.service";

@Resolver()
export class ReservaResolver {
  constructor(
    //
    private reservaService: ReservaService,
  ) {}
  //
  @PocOperation(PocTokens.ReservaList)
  async reservaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ReservaListOperationInput,
  ) {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.ReservaFindOneById)
  async reservaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ReservaFindOneByIdOperationInput,
  ) {
    return this.reservaService.reservaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @PocOperation(PocTokens.ReservaCreate)
  async reservaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ReservaCreateOperationInput,
  ) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.ReservaUpdateOneById)
  async reservaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ReservaUpdateByIdOperationInput,
  ) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.ReservaDeleteOneById)
  async reservaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ReservaDeleteByIDCombinedInput,
  ) {
    return this.reservaService.reservaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
