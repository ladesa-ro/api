import { Resolver } from '@nestjs/graphql';

@Resolver()
export class TurmaResolver {
  // constructor(
  //   //
  //   private turmaService: TurmaService,
  // ) {}
  // //
  // @Operacao(Spec.TurmaFindAllOperator())
  // async turmaFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.TurmaFindAllOperator()) dto: Spec.IPaginatedInputDto) {
  //   return this.turmaService.turmaFindAll(contextoDeAcesso, dto);
  // }
  // //
  // @Operacao(Spec.TurmaFindOneByIdOperator())
  // async turmaFindOneById(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.TurmaFindOneByIdOperator())
  //   dto: LadesaTypings.TurmaFindOneInput,
  // ) {
  //   return this.turmaService.turmaFindByIdStrict(contextoDeAcesso, dto);
  // }
  // //
  // @Operacao(Spec.TurmaCreateOperator())
  // async turmaCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.TurmaCreateOperator()) dto: Spec.ITurmaInputDto) {
  //   return this.turmaService.turmaCreate(contextoDeAcesso, dto);
  // }
  // @Operacao(Spec.TurmaUpdateOperator())
  // async turmaUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.TurmaUpdateOperator()) dto: Spec.ITurmaUpdateDto) {
  //   return this.turmaService.turmaUpdate(contextoDeAcesso, dto);
  // }
  // @Operacao(Spec.TurmaDeleteOperator())
  // async turmaDeleteOneById(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.TurmaDeleteOperator())
  //   dto: Spec.ITurmaDeleteOneByIdInputDto,
  // ) {
  //   return this.turmaService.turmaDeleteOneById(contextoDeAcesso, dto);
  // }
}
