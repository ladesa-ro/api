import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";

@Resolver()
export class HorarioGeradoAulaResolver {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {}
  //
  @PocOperation(PocTokens.HorarioGeradoAulaList)
  async horarioGeradoAulaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaListCombinedInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.HorarioGeradoAulaFindOneByID)
  async horarioGeradoAulaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaFindByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @PocOperation(PocTokens.HorarioGeradoAulaCreate)
  async horarioGeradoAulaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaCreateCombinedInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaCreate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.HorarioGeradoAulaUpdateOneByID)
  async horarioGeradoAulaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaUpdateByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.HorarioGeradoAulaDeleteOneByID)
  async horarioGeradoAulaOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaDeleteByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, { id: dto.params.id });
  }
}
