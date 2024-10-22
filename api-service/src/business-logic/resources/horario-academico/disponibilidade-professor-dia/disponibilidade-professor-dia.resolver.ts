import { CombinedInput } from "@/business-logic/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DisponibilidadeProfessorDiaService } from "./disponibilidade-professor-dia.service";

@Resolver()
export class DisponibilidadeProfessorDiaResolver {
  constructor(private disponibilidadeProfessorDiaService: DisponibilidadeProfessorDiaService) {}
  //
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDiaList)
  async disponibilidadeProfessorDiaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDiaListCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaFindAll(accessContext, dto);
  }
  //
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDiaFindOneByID)
  async disponibilidadeProfessorDiaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDiaFindByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDiaCreate)
  async disponibilidadeProfessorDiaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDiaCreateCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaCreate(accessContext, dto);
  }
  //
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDiaUpdateOneByID)
  async disponibilidadeProfessorDiaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDiaUpdateByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaUpdate(accessContext, dto);
  }
  //
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDiaDeleteOneByID)
  async disponibilidadeProfessorDiaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDiaDeleteByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaDeleteOneById(accessContext, { id: dto.params.id });
  }
}
