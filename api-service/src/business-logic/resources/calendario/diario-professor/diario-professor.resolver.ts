import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { DiarioProfessorService } from "./diario-professor.service";

@Resolver()
export class DiarioProfessorResolver {
  constructor(private diarioProfessorService: DiarioProfessorService) {}
  @PocOperation(PocTokens.DiarioProfessorList)
  async diarioProfessorFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorListCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, dto);
  }
  @PocOperation(PocTokens.DiarioProfessorFindOneByID)
  async diarioProfessorFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorFindByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, { id: dto.params.id });
  }
  @PocOperation(PocTokens.DiarioProfessorCreate)
  async diarioProfessorCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorCreateCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.DiarioProfessorUpdateOneByID)
  async diarioProfessorUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorUpdateByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.DiarioProfessorDeleteOneByID)
  async diarioProfessorDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorDeleteByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, { id: dto.params.id });
  }
}
