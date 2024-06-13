import LadesaTypings from '@ladesa-ro/especificacao';
import { Info, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { graphqlExtractSelection } from '../../../helpers/ladesa/-helpers/graphql-selection';
import { CidadeService } from './cidade.service';

@Resolver()
export class CidadeResolver {
  constructor(
    //
    private cidadeService: CidadeService,
  ) {}

  // ========================================================

  @Operation(LadesaTypings.Tokens.Cidade.Operations.List)
  async cidadeFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CidadeListCombinedInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.cidadeService.findAll(contextoDeAcesso, dto, graphqlExtractSelection(info, 'paginated'));
  }

  // ========================================================
  @Operation(LadesaTypings.Tokens.Cidade.Operations.FindById)
  async cidadeFindById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CidadeFindByIDCombinedInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.cidadeService.findByIdStrict(contextoDeAcesso, { id: dto.params.id }, graphqlExtractSelection(info));
  }
}
