import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
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
  async reservaFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(ReservaOperations.RESERVA_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.reservaService.reservaFindAll(clientAccess, dto);
  }

  //

  @DtoOperationGqlQuery(ReservaOperations.RESERVA_FIND_ONE_BY_ID)
  async reservaFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(ReservaOperations.RESERVA_FIND_ONE_BY_ID)
    dto: Dto.IReservaFindOneByIdInputDto,
  ) {
    return this.reservaService.reservaFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(ReservaOperations.RESERVA_CREATE)
  async reservaCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(ReservaOperations.RESERVA_CREATE) dto: Dto.IReservaInputDto) {
    return this.reservaService.reservaCreate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(ReservaOperations.RESERVA_UPDATE)
  async reservaUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(ReservaOperations.RESERVA_UPDATE) dto: Dto.IReservaUpdateDto) {
    return this.reservaService.reservaUpdate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(ReservaOperations.RESERVA_DELETE_ONE_BY_ID)
  async reservaDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(ReservaOperations.RESERVA_DELETE_ONE_BY_ID)
    dto: Dto.IReservaDeleteOneByIdInputDto,
  ) {
    return this.reservaService.reservaDeleteOneById(clientAccess, dto);
  }
}
