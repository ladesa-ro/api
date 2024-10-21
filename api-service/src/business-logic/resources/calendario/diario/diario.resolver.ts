import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DiarioService } from "./diario.service";

@Resolver()
export class DiarioResolver {
  constructor(
    //
    private diarioService: DiarioService,
  ) {}
  //
  @PocOperation(PocTokens.DiarioList)
  async diarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiarioListOperationInput,
  ) {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DiarioFindOneById)
  async diarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiarioFindOneByIdOperationInput,
  ) {
    return this.diarioService.diarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @PocOperation(PocTokens.DiarioCreate)
  async diarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiarioCreateOperationInput,
  ) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.DiarioUpdateOneById)
  async diarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiarioUpdateByIdOperationInput,
  ) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.DiarioDeleteOneById)
  async diarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiarioDeleteByIDCombinedInput,
  ) {
    return this.diarioService.diarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
