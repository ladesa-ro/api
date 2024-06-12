import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { AmbienteDto } from './ambiente.dtos';
import { AmbienteService } from './ambiente.service';

@Resolver(() => AmbienteDto)
export class AmbienteResolver {
  constructor(
    //
    private ambienteService: AmbienteService,
  ) {}
  //
  // @Operation(LadesaTypings.Tokens.Ambiente.Operations.List)
  // async ambienteFindAll(
  //   //
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @CombinedInput() combinedInput: LadesaTypings.AmbienteListCombinedInput,
  // ) {
  //   return this.ambienteService.ambienteFindAll(contextoDeAcesso, combinedInput);
  // }
  //
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.FindById)
  async ambienteFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() combinedInput: LadesaTypings.AmbienteFindByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id: combinedInput.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.Create)
  async ambienteCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.AmbienteCreateCombinedInput,
  ) {
    return this.ambienteService.ambienteCreate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.UpdateById)
  async ambienteUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.AmbienteUpdateByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteUpdate(contextoDeAcesso, dto);
  }

  @Operation(LadesaTypings.Tokens.Ambiente.Operations.DeleteById)
  async ambienteDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() combinedInput: LadesaTypings.AmbienteDeleteByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteDeleteOneById(contextoDeAcesso, { id: combinedInput.params.id });
  }
}
