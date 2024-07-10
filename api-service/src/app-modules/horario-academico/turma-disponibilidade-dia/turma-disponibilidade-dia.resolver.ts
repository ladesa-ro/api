import { AccessContext, AccessContextGraphQl } from '@/access-context';
import { CombinedInput, Operation } from '@/app-standards';
import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { TurmaDisponibilidadeDiaService } from './turma-disponibilidade-dia.service';

@Resolver()
export class TurmaDisponibilidadeDiaResolver {
  constructor(private turmaDisponibilidadeDiaService: TurmaDisponibilidadeDiaService) {}
  //
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Operations.List)
  async turmaDisponibilidadeDiaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeDiaListCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Operations.FindById)
  async turmaDisponibilidadeDiaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeDiaFindByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Operations.Create)
  async turmaDisponibilidadeDiaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeDiaCreateCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaCreate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Operations.UpdateById)
  async turmaDisponibilidadeDiaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeDiaUpdateByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaUpdate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Operations.DeleteById)
  async turmaDisponibilidadeDiaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeDiaDeleteByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaDeleteOneById(accessContext, { id: dto.params.id });
  }
}
