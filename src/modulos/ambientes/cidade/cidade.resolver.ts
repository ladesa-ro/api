import LadesaTypings from '@ladesa-ro/especificacao';
import { Info, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
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
    @CombinedInput() dto: Spec.IPaginatedInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(info as any)
      .filter((i) => i.startsWith('data.'))
      .map((i) => i.slice(i.indexOf('.') + 1));
    return this.cidadeService.findAll(contextoDeAcesso, dto, selection);
  }

  // ========================================================
  @Operation(LadesaTypings.Tokens.Cidade.Operations.FindById)
  async cidadeFindById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput()
    dto: LadesaTypings.CidadeFindOneInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(info as any);
    return this.cidadeService.findByIdStrict(contextoDeAcesso, dto, selection);
  }
}
