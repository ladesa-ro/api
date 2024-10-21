import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
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
    @CombinedInput() dto: LadesaTypings.ReservaListCombinedInput,
  ) {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.ReservaFindOneByID)
  async reservaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaFindByIDCombinedInput,
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
    @CombinedInput() dto: LadesaTypings.ReservaCreateCombinedInput,
  ) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.ReservaUpdateOneByID)
  async reservaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaUpdateByIDCombinedInput,
  ) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.ReservaDeleteOneByID)
  async reservaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaDeleteByIDCombinedInput,
  ) {
    return this.reservaService.reservaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
