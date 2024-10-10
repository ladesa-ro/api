import { type AccessContext, AccessContextGraphQl } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DisponibilidadeProfessorService } from "./disponibilidade-professor.service";

@Resolver()
export class DisponibilidadeProfessorResolver {
  constructor(private disponibilidadeProfessorService: DisponibilidadeProfessorService) {}
  //
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessor.Operations.List)
  async disponibilidadeProfessorFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorListCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessor.Operations.FindById)
  async disponibilidadeProfessorFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorFindByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessor.Operations.Create)
  async disponibilidadeProfessorCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorCreateCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorCreate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessor.Operations.UpdateById)
  async disponibilidadeProfessorUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorUpdateByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorUpdate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessor.Operations.DeleteById)
  async disponibilidadeProfessorDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDeleteByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorDeleteOneById(accessContext, { id: dto.params.id });
  }
}
