import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { AccessContext, AccessContextGraphQl } from '../../../access-context';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { CursoService } from './curso.service';

@Resolver()
export class CursoResolver {
  constructor(
    //
    private cursoService: CursoService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Curso.Operations.List)
  async cursoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoListCombinedInput,
  ) {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Curso.Operations.FindById)
  async cursoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoFindByIDCombinedInput,
  ) {
    return this.cursoService.cursoFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.Curso.Operations.Create)
  async cursoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoCreateCombinedInput,
  ) {
    return this.cursoService.cursoCreate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Curso.Operations.Create)
  async cursoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoUpdateByIDCombinedInput,
  ) {
    return this.cursoService.cursoUpdate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Curso.Operations.DeleteById)
  async cursoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoDeleteByIDCombinedInput,
  ) {
    return this.cursoService.cursoDeleteOneById(accessContext, { id: dto.params.id });
  }
}
