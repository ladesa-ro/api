import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { DadosEntrada } from '../../../legacy';
import { DiarioDto } from './diario.dtos';
import { DiarioService } from './diario.service';

@Resolver(() => DiarioDto)
export class DiarioResolver {
  constructor(
    //
    private diarioService: DiarioService,
  ) {}

  //

  @Operacao(Spec.DiarioFindAllOperator())
  async diarioFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntrada(Spec.DiarioFindAllOperator()) dto: Spec.ISearchInputDto) {
    return this.diarioService.diarioFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.DiarioFindOneByIdOperator())
  async diarioFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntrada(Spec.DiarioFindOneByIdOperator())
    dto: Spec.IDiarioFindOneByIdInputDto,
  ) {
    return this.diarioService.diarioFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.DiarioCreateOperator())
  async diarioCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntrada(Spec.DiarioCreateOperator()) dto: Spec.IDiarioInputDto) {
    return this.diarioService.diarioCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DiarioUpdateOperator())
  async diarioUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntrada(Spec.DiarioUpdateOperator()) dto: Spec.IDiarioUpdateDto) {
    return this.diarioService.diarioUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DiarioDeleteOperator())
  async diarioDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntrada(Spec.DiarioDeleteOperator())
    dto: Spec.IDiarioDeleteOneByIdInputDto,
  ) {
    return this.diarioService.diarioDeleteOneById(contextoDeAcesso, dto);
  }
}
