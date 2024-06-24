import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { AccessContext, AccessContextGraphQl } from '../../../access-context';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { DiarioService } from './diario.service';

@Resolver()
export class DiarioResolver {
  constructor(
    //
    private diarioService: DiarioService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Diario.Operations.List)
  async diarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioListCombinedInput,
  ) {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Diario.Operations.FindById)
  async diarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioFindByIDCombinedInput,
  ) {
    return this.diarioService.diarioFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.Diario.Operations.Create)
  async diarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioCreateCombinedInput,
  ) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Diario.Operations.Create)
  async diarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioUpdateByIDCombinedInput,
  ) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Diario.Operations.DeleteById)
  async diarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioDeleteByIDCombinedInput,
  ) {
    return this.diarioService.diarioDeleteOneById(accessContext, { id: dto.params.id });
  }
}
