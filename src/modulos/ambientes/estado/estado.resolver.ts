import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Info, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { graphqlExtractSelection } from '../../../helpers/ladesa/-helpers/graphql-selection';
import { EstadoService } from './estado.service';

@Resolver()
export class EstadoResolver {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}
  // ========================================================
  @Operation(LadesaTypings.Tokens.Estado.Operations.List)
  async estadoFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EstadoListCombinedInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.estadoService.findAll(contextoDeAcesso, dto, graphqlExtractSelection(info, 'paginated'));
  }

  // ========================================================
  @Operation(LadesaTypings.Tokens.Estado.Operations.FindById)
  async estadoFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EstadoFindByIDCombinedInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.estadoService.findByIdStrict(contextoDeAcesso, { id: dto.params.id }, graphqlExtractSelection(info));
  }
  // ========================================================
}
