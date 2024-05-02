import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { GqlDtoInput } from '../../../legacy';
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
  async blocoFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.BlocoFindAllOperator()) dto: Spec.ISearchInputDto) {
    return this.blocoService.blocoFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.BlocoFindOneByIdOperator())
  async blocoFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.BlocoFindOneByIdOperator())
    dto: Spec.IBlocoFindOneByIdInputDto,
  ) {
    return this.blocoService.blocoFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.BlocoCreateOperator())
  async blocoCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.BlocoCreateOperator()) dto: Spec.IBlocoInputDto) {
    return this.blocoService.blocoCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.BlocoUpdateOperator())
  async blocoUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.BlocoUpdateOperator()) dto: Spec.IBlocoUpdateDto) {
    return this.blocoService.blocoUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.BlocoDeleteOperator())
  async blocoDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.BlocoDeleteOperator())
    dto: Spec.IBlocoDeleteOneByIdInputDto,
  ) {
    return this.blocoService.blocoDeleteOneById(contextoDeAcesso, dto);
  }
}
