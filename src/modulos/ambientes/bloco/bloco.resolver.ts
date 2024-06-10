import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaGql, Operacao } from '../../../legacy/especificacao';
import { BlocoDto } from './bloco.dtos';
import { BlocoService } from './bloco.service';
@Resolver(() => BlocoDto)
export class BlocoResolver {
  constructor(
    //
    private blocoService: BlocoService,
  ) {}

  //

  @Operacao(Spec.BlocoFindAllOperator())
  async blocoFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.BlocoFindAllOperator()) dto: Spec.IPaginatedInputDto) {
    return this.blocoService.blocoFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.BlocoFindOneByIdOperator())
  async blocoFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.BlocoFindOneByIdOperator())
    dto: LadesaTypings.BlocoFindOneInput,
  ) {
    return this.blocoService.blocoFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.BlocoCreateOperator())
  async blocoCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.BlocoCreateOperator()) dto: Spec.IBlocoInputDto) {
    return this.blocoService.blocoCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.BlocoUpdateOperator())
  async blocoUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.BlocoUpdateOperator()) dto: Spec.IBlocoUpdateDto) {
    return this.blocoService.blocoUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.BlocoDeleteOperator())
  async blocoDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.BlocoDeleteOperator())
    dto: Spec.IBlocoDeleteOneByIdInputDto,
  ) {
    return this.blocoService.blocoDeleteOneById(contextoDeAcesso, dto);
  }
}
