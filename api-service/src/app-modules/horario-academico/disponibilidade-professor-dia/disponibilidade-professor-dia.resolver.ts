import { AccessContext, AccessContextGraphQl } from '@/access-context';
import { CombinedInput, Operation } from '@/app-standards';
import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { DisponibilidadeProfessorDiaService } from './disponibilidade-professor-dia.service';

@Resolver()
export class DisponibilidadeProfessorDiaResolver {
  constructor(private disponibilidadeProfessorDiaService: DisponibilidadeProfessorDiaService) {}
  //
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Operations.List)
  async disponibilidadeProfessorDiaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeProfessorDiaListCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Operations.FindById)
  async disponibilidadeProfessorDiaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeProfessorDiaFindByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Operations.Create)
  async disponibilidadeProfessorDiaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeProfessorDiaCreateCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaCreate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Operations.UpdateById)
  async disponibilidadeProfessorDiaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeProfessorDiaUpdateByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaUpdate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Operations.DeleteById)
  async disponibilidadeProfessorDiaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeProfessorDiaDeleteByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaDeleteOneById(accessContext, { id: dto.params.id });
  }
}
