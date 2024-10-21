import { CombinedInput } from "@/business-logic/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DisponibilidadeProfessorService } from "./disponibilidade-professor.service";

@Resolver()
export class DisponibilidadeProfessorResolver {
  constructor(private disponibilidadeProfessorService: DisponibilidadeProfessorService) {}
  //
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorList)
  async disponibilidadeProfessorFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorListCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorFindAll(accessContext, dto);
  }
  //
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorFindOneByID)
  async disponibilidadeProfessorFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorFindByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorCreate)
  async disponibilidadeProfessorCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorCreateCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorCreate(accessContext, dto);
  }
  //
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorUpdateOneByID)
  async disponibilidadeProfessorUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorUpdateByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorUpdate(accessContext, dto);
  }
  //
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDeleteOneByID)
  async disponibilidadeProfessorDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDeleteByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorDeleteOneById(accessContext, { id: dto.params.id });
  }
}
