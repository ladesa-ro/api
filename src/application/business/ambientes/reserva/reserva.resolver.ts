import { Resolver } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { ReservaOperations } from './dtos';
import { ReservaDto } from './dtos/reserva.dto';
import { ReservaService } from './reserva.service';

@Resolver(() => ReservaDto)
export class ReservaResolver {
  constructor(
    //
    private reservaService: ReservaService,
  ) {}

  //

  @DtoOperationGqlQuery(ReservaOperations.RESERVA_FIND_ALL)
  async reservaFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(ReservaOperations.RESERVA_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.reservaService.reservaFindAll(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlQuery(ReservaOperations.RESERVA_FIND_ONE_BY_ID)
  async reservaFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(ReservaOperations.RESERVA_FIND_ONE_BY_ID)
    dto: Dto.IReservaFindOneByIdInputDto,
  ) {
    return this.reservaService.reservaFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(ReservaOperations.RESERVA_CREATE)
  async reservaCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(ReservaOperations.RESERVA_CREATE) dto: Dto.IReservaInputDto) {
    return this.reservaService.reservaCreate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(ReservaOperations.RESERVA_UPDATE)
  async reservaUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(ReservaOperations.RESERVA_UPDATE) dto: Dto.IReservaUpdateDto) {
    return this.reservaService.reservaUpdate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(ReservaOperations.RESERVA_DELETE_ONE_BY_ID)
  async reservaDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(ReservaOperations.RESERVA_DELETE_ONE_BY_ID)
    dto: Dto.IReservaDeleteOneByIdInputDto,
  ) {
    return this.reservaService.reservaDeleteOneById(contextoDeAcesso, dto);
  }
}
