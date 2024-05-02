import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { GqlDtoInput } from '../../../legacy';
import { ReservaService } from './reserva.service';
import { Operacao } from '../../../especificacao';
import { ReservaDto } from './reserva.dtos';

@Resolver(() => ReservaDto)
export class ReservaResolver {
  constructor(
    //
    private reservaService: ReservaService,
  ) {}

  //

  @Operacao(Spec.ReservaFindAllOperator())
  async reservaFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.ReservaFindAllOperator()) dto: Spec.ISearchInputDto) {
    return this.reservaService.reservaFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.ReservaFindOneByIdOperator())
  async reservaFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.ReservaFindOneByIdOperator())
    dto: Spec.IReservaFindOneByIdInputDto,
  ) {
    return this.reservaService.reservaFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.ReservaCreateOperator())
  async reservaCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.ReservaCreateOperator()) dto: Spec.IReservaInputDto) {
    return this.reservaService.reservaCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.ReservaUpdateOperator())
  async reservaUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.ReservaUpdateOperator()) dto: Spec.IReservaUpdateDto) {
    return this.reservaService.reservaUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.ReservaDeleteOperator())
  async reservaDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.ReservaDeleteOperator())
    dto: Spec.IReservaDeleteOneByIdInputDto,
  ) {
    return this.reservaService.reservaDeleteOneById(contextoDeAcesso, dto);
  }
}
