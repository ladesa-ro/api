import { Resolver } from '@nestjs/graphql';
import { AmbienteDto } from './ambiente.dtos';
// import { AmbienteService } from './ambiente.service';
// import * as Spec from '@sisgea/spec';
// import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
// import { DadosEntradaGql, Operacao } from '../../../legacy/especificacao';

@Resolver(() => AmbienteDto)
export class AmbienteResolver {
  // constructor(
  //   //
  //   private ambienteService: AmbienteService,
  // ) {}
  //
  // @Operacao(Spec.AmbienteFindAllOperator())
  // async ambienteFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.AmbienteFindAllOperator()) dto: Spec.IPaginatedInputDto) {
  //   return this.ambienteService.ambienteFindAll(contextoDeAcesso, dto);
  // }
  //
  // @Operacao(Spec.AmbienteFindOneByIdOperator())
  // async ambienteFindOneById(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.AmbienteFindOneByIdOperator())
  //   dto: LadesaTypings.AmbienteFindOneInput,
  // ) {
  //   return this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, dto);
  // }
  //
  // @Operacao(Spec.AmbienteCreateOperator())
  // async ambienteCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.AmbienteCreateOperator()) dto: Spec.IAmbienteInputDto) {
  //   return this.ambienteService.ambienteCreate(contextoDeAcesso, dto);
  // }
  // @Operacao(Spec.AmbienteUpdateOperator())
  // async ambienteUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.AmbienteUpdateOperator()) dto: Spec.IAmbienteUpdateDto) {
  //   return this.ambienteService.ambienteUpdate(contextoDeAcesso, dto);
  // }
  // @Operacao(Spec.AmbienteDeleteOperator())
  // async ambienteDeleteOneById(
  //   @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
  //   @DadosEntradaGql(Spec.AmbienteDeleteOperator())
  //   dto: Spec.IAmbienteDeleteOneByIdInputDto,
  // ) {
  //   return this.ambienteService.ambienteDeleteOneById(contextoDeAcesso, dto);
  // }
}
