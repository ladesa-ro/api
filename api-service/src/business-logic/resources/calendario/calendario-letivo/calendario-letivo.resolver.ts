import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { CalendarioLetivoService } from "./calendario-letivo.service";

@Resolver()
export class CalendarioLetivoResolver {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}
  //
  @PocOperation(PocTokens.CalendarioLetivoList)
  async calendarioLetivoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoListCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.CalendarioLetivoFindOneByID)
  async calendarioLetivoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoFindByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @PocOperation(PocTokens.CalendarioLetivoCreate)
  async calendarioLetivoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoCreateCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.CalendarioLetivoUpdateOneByID)
  async calendarioLetivoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoUpdateByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.CalendarioLetivoDeleteOneByID)
  async calendarioLetivoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoDeleteByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.params.id });
  }
}
