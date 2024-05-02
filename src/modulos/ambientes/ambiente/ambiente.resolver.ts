import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { GqlDtoInput } from '../../../legacy';
import { AmbienteService } from './ambiente.service';
import { AmbienteDto } from './ambiente.dtos';

@Resolver(() => AmbienteDto)
export class AmbienteResolver {
  constructor(
    //
    private ambienteService: AmbienteService,
  ) {}

  //

  @Operacao(Spec.AmbienteFindAllOperator())
  async ambienteFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.AmbienteFindAllOperator()) dto: Spec.ISearchInputDto) {
    return this.ambienteService.ambienteFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.AmbienteFindOneByIdOperator())
  async ambienteFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.AmbienteFindOneByIdOperator())
    dto: Spec.IAmbienteFindOneByIdInputDto,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.AmbienteCreateOperator())
  async ambienteCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.AmbienteCreateOperator()) dto: Spec.IAmbienteInputDto) {
    return this.ambienteService.ambienteCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.AmbienteUpdateOperator())
  async ambienteUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.AmbienteUpdateOperator()) dto: Spec.IAmbienteUpdateDto) {
    return this.ambienteService.ambienteUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.AmbienteDeleteOperator())
  async ambienteDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.AmbienteDeleteOperator())
    dto: Spec.IAmbienteDeleteOneByIdInputDto,
  ) {
    return this.ambienteService.ambienteDeleteOneById(contextoDeAcesso, dto);
  }
}
