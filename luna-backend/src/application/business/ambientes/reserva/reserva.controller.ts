import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
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
import { ReservaOperations } from './dtos';
import { ReservaService } from './reserva.service';

@ApiTags('Reservas')
@Controller('/reservas')
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  //

  @Get('/')
  @DtoOperationFindAll(ReservaOperations.RESERVA_FIND_ALL)
  async reservaFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.IReservaFindAllResultDto> {
    return this.reservaService.reservaFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(ReservaOperations.RESERVA_FIND_ONE_BY_ID)
  async reservaFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(ReservaOperations.RESERVA_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.reservaService.reservaFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(ReservaOperations.RESERVA_CREATE)
  async reservaCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(ReservaOperations.RESERVA_CREATE) dto: Dto.IReservaInputDto) {
    return this.reservaService.reservaCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(ReservaOperations.RESERVA_UPDATE)
  async reservaUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(ReservaOperations.RESERVA_UPDATE, 'id')
    id: string,
    @HttpDtoBody(ReservaOperations.RESERVA_UPDATE)
    dto: Omit<Dto.IReservaUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IReservaUpdateDto = {
      ...dto,
      id,
    };

    return this.reservaService.reservaUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(ReservaOperations.RESERVA_DELETE_ONE_BY_ID)
  async reservaDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(ReservaOperations.RESERVA_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.reservaService.reservaDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
