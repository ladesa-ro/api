import { AccessContext, AccessContextGraphQl } from '@/access-context';
import { CombinedInput, Operation } from '@/app-standards';
import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { AulaService } from './aula.service';

@Resolver()
export class AulaResolver {
  constructor(
    //
    private aulaService: AulaService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Aula.Operations.List)
  async aulaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaListCombinedInput,
  ) {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Aula.Operations.FindById)
  async aulaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaFindByIDCombinedInput,
  ) {
    return this.aulaService.aulaFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.Aula.Operations.Create)
  async aulaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaCreateCombinedInput,
  ) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Aula.Operations.UpdateById)
  async aulaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaUpdateByIDCombinedInput,
  ) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Aula.Operations.DeleteById)
  async aulaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaDeleteByIDCombinedInput,
  ) {
    return this.aulaService.aulaDeleteOneById(accessContext, { id: dto.params.id });
  }
}
