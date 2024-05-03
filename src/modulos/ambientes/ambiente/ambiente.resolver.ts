import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { DadosEntrada } from '../../../legacy';
import { AmbienteDto } from './ambiente.dtos';
import { AmbienteService } from './ambiente.service';

@Resolver(() => AmbienteDto)
export class AmbienteResolver {
  constructor(
    //
    private ambienteService: AmbienteService,
  ) {}

  //

  @Operacao(Spec.AmbienteFindAllOperator())
  async ambienteFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntrada(Spec.AmbienteFindAllOperator()) dto: Spec.ISearchInputDto) {
    return this.ambienteService.ambienteFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.AmbienteFindOneByIdOperator())
  async ambienteFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntrada(Spec.AmbienteFindOneByIdOperator())
    dto: Spec.IAmbienteFindOneByIdInputDto,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.AmbienteCreateOperator())
  async ambienteCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntrada(Spec.AmbienteCreateOperator()) dto: Spec.IAmbienteInputDto) {
    return this.ambienteService.ambienteCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.AmbienteUpdateOperator())
  async ambienteUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntrada(Spec.AmbienteUpdateOperator()) dto: Spec.IAmbienteUpdateDto) {
    return this.ambienteService.ambienteUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.AmbienteDeleteOperator())
  async ambienteDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntrada(Spec.AmbienteDeleteOperator())
    dto: Spec.IAmbienteDeleteOneByIdInputDto,
  ) {
    return this.ambienteService.ambienteDeleteOneById(contextoDeAcesso, dto);
  }
}
