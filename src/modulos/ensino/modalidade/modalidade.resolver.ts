import { Resolver } from '@nestjs/graphql';

@Resolver()
export class ModalidadeResolver {
  // constructor(
  //   //
  //   private modalidadeService: ModalidadeService,
  // ) {}
  // //
  // @Operacao(Spec.ModalidadeFindAllOperator())
  // async modalidadeFindAll(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.ModalidadeFindAllOperator()) dto: Spec.IPaginatedInputDto,
  //   @Info() info: GraphQLResolveInfo,
  // ) {
  //   const selection = getFieldNames(info as any)
  //     .filter((i) => i.startsWith('data.'))
  //     .map((i) => i.slice(i.indexOf('.') + 1));
  //   return this.modalidadeService.modalidadeFindAll(contextoDeAcesso, dto, selection);
  // }
  // //
  // @Operacao(Spec.ModalidadeFindOneByIdOperator())
  // async modalidadeFindOneById(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.ModalidadeFindOneByIdOperator())
  //   dto: LadesaTypings.ModalidadeFindOneInput,
  //   @Info() info: GraphQLResolveInfo,
  // ) {
  //   const selection = getFieldNames(info as any);
  //   return this.modalidadeService.modalidadeFindByIdStrict(contextoDeAcesso, dto, ['id', ...selection]);
  // }
  // //
  // @Operacao(Spec.ModalidadeCreateOperator())
  // async modalidadeCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.ModalidadeCreateOperator()) dto: Spec.IModalidadeInputDto) {
  //   return this.modalidadeService.modalidadeCreate(contextoDeAcesso, dto);
  // }
  // @Operacao(Spec.ModalidadeUpdateOperator())
  // async modalidadeUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.ModalidadeUpdateOperator()) dto: Spec.IModalidadeUpdateDto) {
  //   return this.modalidadeService.modalidadeUpdate(contextoDeAcesso, dto);
  // }
  // @Operacao(Spec.ModalidadeDeleteOperator())
  // async modalidadeDeleteOneById(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.ModalidadeDeleteOperator())
  //   dto: Spec.IModalidadeDeleteOneByIdInputDto,
  // ) {
  //   return this.modalidadeService.modalidadeDeleteOneById(contextoDeAcesso, dto);
  // }
}
