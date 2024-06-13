import { Resolver } from '@nestjs/graphql';

@Resolver()
export class DiarioResolver {
  // constructor(
  //   //
  //   private diarioService: DiarioService,
  // ) {}
  // //
  // @Operacao(Spec.DiarioFindAllOperator())
  // async diarioFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.DiarioFindAllOperator()) dto: Spec.IPaginatedInputDto) {
  //   return this.diarioService.diarioFindAll(contextoDeAcesso, dto);
  // }
  // //
  // @Operacao(Spec.DiarioFindOneByIdOperator())
  // async diarioFindOneById(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.DiarioFindOneByIdOperator())
  //   dto: LadesaTypings.DiarioFindOneInput,
  // ) {
  //   return this.diarioService.diarioFindByIdStrict(contextoDeAcesso, dto);
  // }
  // //
  // @Operacao(Spec.DiarioCreateOperator())
  // async diarioCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.DiarioCreateOperator()) dto: Spec.IDiarioInputDto) {
  //   return this.diarioService.diarioCreate(contextoDeAcesso, dto);
  // }
  // @Operacao(Spec.DiarioUpdateOperator())
  // async diarioUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.DiarioUpdateOperator()) dto: Spec.IDiarioUpdateDto) {
  //   return this.diarioService.diarioUpdate(contextoDeAcesso, dto);
  // }
  // @Operacao(Spec.DiarioDeleteOperator())
  // async diarioDeleteOneById(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.DiarioDeleteOperator())
  //   dto: Spec.IDiarioDeleteOneByIdInputDto,
  // ) {
  //   return this.diarioService.diarioDeleteOneById(contextoDeAcesso, dto);
  // }
}
