import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery, GqlDtoInput } from 'infrastructure';
import * as Dto from '../../(spec)';

import { Resolver } from '@nestjs/graphql';
import { IClientAccess } from '../../../../domain';
import { CalendarioLetivoService } from './calendario-letivo.service';
import { CalendarioLetivoDto } from './dtos/calendario-letivo.dto';
import { CalendarioLetivoOperations } from './dtos/calendario-letivo.operations';

@Resolver(() => CalendarioLetivoDto)
export class CalendarioLetivoResolver {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  //

  @DtoOperationGqlQuery(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ALL)
  async calendarioLetivoFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.calendarioLetivoService.calendarioLetivoFindAll(clientAccess, dto);
  }

  //

  @DtoOperationGqlQuery(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ONE_BY_ID)
  async calendarioLetivoFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ONE_BY_ID)
    dto: Dto.ICalendarioLetivoFindOneByIdInputDto,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(CalendarioLetivoOperations.CALENDARIO_LETIVO_CREATE)
  async calendarioLetivoCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(CalendarioLetivoOperations.CALENDARIO_LETIVO_CREATE) dto: Dto.ICalendarioLetivoInputDto) {
    return this.calendarioLetivoService.calendarioLetivoCreate(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(CalendarioLetivoOperations.CALENDARIO_LETIVO_UPDATE)
  async calendarioLetivoUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(CalendarioLetivoOperations.CALENDARIO_LETIVO_UPDATE) dto: Dto.ICalendarioLetivoUpdateDto) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(CalendarioLetivoOperations.CALENDARIO_LETIVO_DELETE_ONE_BY_ID)
  async calendarioLetivoDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(CalendarioLetivoOperations.CALENDARIO_LETIVO_DELETE_ONE_BY_ID)
    dto: Dto.ICalendarioLetivoDeleteOneByIdInputDto,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(clientAccess, dto);
  }
}
