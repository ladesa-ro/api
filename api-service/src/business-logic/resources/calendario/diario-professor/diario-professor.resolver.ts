import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DiarioProfessorService } from "./diario-professor.service";

@Resolver()
export class DiarioProfessorResolver {
  constructor(private diarioProfessorService: DiarioProfessorService) {}
  @PocOperation(PocTokens.DiarioProfessorList)
  async diarioProfessorFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiarioProfessorListOperationInput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, dto);
  }
  @PocOperation(PocTokens.DiarioProfessorFindOneById)
  async diarioProfessorFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiarioProfessorFindOneByIdOperationInput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, { id: dto.params.id });
  }
  @PocOperation(PocTokens.DiarioProfessorCreate)
  async diarioProfessorCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiarioProfessorCreateOperationInput,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.DiarioProfessorUpdateOneById)
  async diarioProfessorUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiarioProfessorUpdateByIdOperationInput,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.DiarioProfessorDeleteOneById)
  async diarioProfessorDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiarioProfessorDeleteByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, { id: dto.params.id });
  }
}
