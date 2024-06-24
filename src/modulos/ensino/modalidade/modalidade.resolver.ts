import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Info as GqlInfo, Resolver as GqlResolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { graphqlExtractSelection } from '../../../helpers/ladesa/-helpers/graphql-selection';
import { ModalidadeService } from './modalidade.service';

@GqlResolver()
export class ModalidadeResolver {
  constructor(
    //
    private modalidadeService: ModalidadeService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.List)
  async modalidadeFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ModalidadeListCombinedInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindAll(contextoDeAcesso, dto, graphqlExtractSelection(info, 'paginated'));
  }
  //
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.FindById)
  async modalidadeFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ModalidadeFindByIDCombinedInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(contextoDeAcesso, { id: dto.params.id }, ['id', ...graphqlExtractSelection(info)]);
  }
  //
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.Create)
  async modalidadeCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ModalidadeCreateCombinedInput,
  ) {
    return this.modalidadeService.modalidadeCreate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.Create)
  async modalidadeUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ModalidadeUpdateByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeUpdate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.DeleteById)
  async modalidadeDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ModalidadeDeleteByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }
}
