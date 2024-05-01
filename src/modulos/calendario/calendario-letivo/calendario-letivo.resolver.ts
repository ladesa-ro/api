import { Resolver } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CalendarioLetivoService } from './calendario-letivo.service';
import { CalendarioLetivoDto } from './dtos/calendario-letivo.dto';
import { CalendarioLetivoOperations } from './dtos/calendario-letivo.operations';
import { DtoOperationGqlQuery, GqlDtoInput, DtoOperationGqlMutation } from '../../../legacy';

@Resolver(() => CalendarioLetivoDto)
export class CalendarioLetivoResolver {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  //

  @DtoOperationGqlQuery(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ALL)
  async calendarioLetivoFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.calendarioLetivoService.calendarioLetivoFindAll(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlQuery(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ONE_BY_ID)
  async calendarioLetivoFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ONE_BY_ID)
    dto: Dto.ICalendarioLetivoFindOneByIdInputDto,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(CalendarioLetivoOperations.CALENDARIO_LETIVO_CREATE)
  async calendarioLetivoCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(CalendarioLetivoOperations.CALENDARIO_LETIVO_CREATE) dto: Dto.ICalendarioLetivoInputDto) {
    return this.calendarioLetivoService.calendarioLetivoCreate(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(CalendarioLetivoOperations.CALENDARIO_LETIVO_UPDATE)
  async calendarioLetivoUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(CalendarioLetivoOperations.CALENDARIO_LETIVO_UPDATE) dto: Dto.ICalendarioLetivoUpdateDto) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(CalendarioLetivoOperations.CALENDARIO_LETIVO_DELETE_ONE_BY_ID)
  async calendarioLetivoDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(CalendarioLetivoOperations.CALENDARIO_LETIVO_DELETE_ONE_BY_ID)
    dto: Dto.ICalendarioLetivoDeleteOneByIdInputDto,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(contextoDeAcesso, dto);
  }
}
