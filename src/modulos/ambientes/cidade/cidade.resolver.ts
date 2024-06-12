import { Resolver } from '@nestjs/graphql';

@Resolver()
export class CidadeResolver {
  // constructor(
  //   //
  //   private cidadeService: CidadeService,
  // ) {}
  // // ========================================================
  // @Operacao(Spec.CidadeFindAllOperator())
  // async cidadeFindAll(@Info() info: GraphQLResolveInfo, @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.CidadeFindAllOperator()) dto: Spec.IPaginatedInputDto) {
  //   const selection = getFieldNames(info as any)
  //     .filter((i) => i.startsWith('data.'))
  //     .map((i) => i.slice(i.indexOf('.') + 1));
  //   return this.cidadeService.findAll(contextoDeAcesso, dto, selection);
  // }
  // // ========================================================
  // @Operacao(Spec.CidadeFindOneByIdOperator())
  // async cidadeFindById(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.CidadeFindOneByIdOperator())
  //   dto: LadesaTypings.CidadeFindOneInput,
  //   @Info() info: GraphQLResolveInfo,
  // ) {
  //   const selection = getFieldNames(info as any);
  //   return this.cidadeService.findByIdStrict(contextoDeAcesso, dto, selection);
  // }
}
