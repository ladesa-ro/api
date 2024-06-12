import { Resolver } from '@nestjs/graphql';

@Resolver()
export class DisciplinaResolver {
  // constructor(
  //   //
  //   private disciplinaService: DisciplinaService,
  // ) {}
  // //
  // @Operacao(Spec.DisciplinaFindAllOperator())
  // async disciplinaFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.DisciplinaFindAllOperator()) dto: Spec.IPaginatedInputDto) {
  //   return this.disciplinaService.disciplinaFindAll(contextoDeAcesso, dto);
  // }
  // //
  // @Operacao(Spec.DisciplinaFindOneByIdOperator())
  // async disciplinaFindOneById(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.DisciplinaFindOneByIdOperator())
  //   dto: LadesaTypings.DisciplinaFindOneInput,
  // ) {
  //   return this.disciplinaService.disciplinaFindByIdStrict(contextoDeAcesso, dto);
  // }
  // //
  // @Operacao(Spec.DisciplinaCreateOperator())
  // async disciplinaCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.DisciplinaCreateOperator()) dto: Spec.IDisciplinaInputDto) {
  //   return this.disciplinaService.disciplinaCreate(contextoDeAcesso, dto);
  // }
  // @Operacao(Spec.DisciplinaUpdateOperator())
  // async disciplinaUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.DisciplinaUpdateOperator()) dto: Spec.IDisciplinaUpdateDto) {
  //   return this.disciplinaService.disciplinaUpdate(contextoDeAcesso, dto);
  // }
  // @Operacao(Spec.DisciplinaDeleteOperator())
  // async disciplinaDeleteOneById(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.DisciplinaDeleteOperator())
  //   dto: Spec.IDisciplinaDeleteOneByIdInputDto,
  // ) {
  //   return this.disciplinaService.disciplinaDeleteOneById(contextoDeAcesso, dto);
  // }
}
