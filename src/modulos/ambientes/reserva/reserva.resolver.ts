import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaGql, Operacao } from '../../../legacy/especificacao';
import { ReservaDto } from './reserva.dtos';
import { ReservaService } from './reserva.service';
@Resolver(() => ReservaDto)
export class ReservaResolver {
  constructor(
    //
    private reservaService: ReservaService,
  ) {}

  //

  @Operacao(Spec.ReservaFindAllOperator())
  async reservaFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.ReservaFindAllOperator()) dto: Spec.IPaginatedInputDto) {
    return this.reservaService.reservaFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.ReservaFindOneByIdOperator())
  async reservaFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.ReservaFindOneByIdOperator())
    dto: Spec.IReservaFindOneByIdInputDto,
  ) {
    return this.reservaService.reservaFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.ReservaCreateOperator())
  async reservaCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.ReservaCreateOperator()) dto: Spec.IReservaInputDto) {
    return this.reservaService.reservaCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.ReservaUpdateOperator())
  async reservaUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.ReservaUpdateOperator()) dto: Spec.IReservaUpdateDto) {
    return this.reservaService.reservaUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.ReservaDeleteOperator())
  async reservaDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.ReservaDeleteOperator())
    dto: Spec.IReservaDeleteOneByIdInputDto,
  ) {
    return this.reservaService.reservaDeleteOneById(contextoDeAcesso, dto);
  }
}
