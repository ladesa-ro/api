import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import type { IContextoDeAcesso } from '../../../../domain';
import {
  ContextoDeAcessoHttp,
  DtoOperationCreate,
  DtoOperationDelete,
  DtoOperationFindAll,
  DtoOperationFindOne,
  DtoOperationUpdate,
  HttpDtoBody,
  HttpDtoParam,
  getSearchInputFromPaginateQuery,
} from '../../../../infrastructure';

import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CalendarioLetivoService } from './calendario-letivo.service';
import { CalendarioLetivoOperations } from './dtos/calendario-letivo.operations';

@ApiTags('Calendarios Letivos')
@Controller('/calendarios-letivos')
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get('/')
  @DtoOperationFindAll(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ALL)
  async calendarioFindAll(@ContextoDeAcessoHttp() clienttAcess: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.ICalendarioLetivoFindAllResultDto> {
    return this.calendarioLetivoService.calendarioLetivoFindAll(clienttAcess, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ONE_BY_ID)
  async calendarioLetivoFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(CalendarioLetivoOperations.CALENDARIO_LETIVO_CREATE)
  async campusCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(CalendarioLetivoOperations.CALENDARIO_LETIVO_CREATE) dto: Dto.ICalendarioLetivoInputDto) {
    return this.calendarioLetivoService.calendarioLetivoCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(CalendarioLetivoOperations.CALENDARIO_LETIVO_UPDATE)
  async calendarioLetivoUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CalendarioLetivoOperations.CALENDARIO_LETIVO_UPDATE, 'id')
    id: string,
    @HttpDtoBody(CalendarioLetivoOperations.CALENDARIO_LETIVO_UPDATE)
    dto: Omit<Dto.ICalendarioLetivoUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.ICalendarioLetivoUpdateDto = {
      ...dto,
      id,
    };

    return this.calendarioLetivoService.calendarioLetivoUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(CalendarioLetivoOperations.CALENDARIO_LETIVO_DELETE_ONE_BY_ID)
  async CalendarioLetivoDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CalendarioLetivoOperations.CALENDARIO_LETIVO_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
