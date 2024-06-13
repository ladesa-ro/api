import LadesaTypings from '@ladesa-ro/especificacao';
import { Info as GqlInfo, Resolver as GqlResolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { graphqlExtractSelection } from '../../../helpers/ladesa/-helpers/graphql-selection';
import { AmbienteService } from './ambiente.service';

@GqlResolver()
export class AmbienteResolver {
  constructor(
    //
    private ambienteService: AmbienteService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.List)
  async ambienteFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.AmbienteListCombinedInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ambienteService.ambienteFindAll(contextoDeAcesso, dto, graphqlExtractSelection(info, 'paginated'));
  }
  //
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.FindById)
  async ambienteFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.AmbienteFindByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
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
    @CombinedInput() dto: LadesaTypings.AmbienteDeleteByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }
}
