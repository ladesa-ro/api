import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
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
import { CampusService } from './campus.service';
import { CampusOperations } from './dtos/campus.operations';

@ApiTags('Campi')
@Controller('/campi')
export class CampusController {
  constructor(private campusService: CampusService) {}

  //

  @Get('/')
  @DtoOperationFindAll(CampusOperations.CAMPUS_FIND_ALL)
  async campusFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.ICampusFindAllResultDto> {
    return this.campusService.campusFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
  async campusFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CampusOperations.CAMPUS_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.campusService.campusFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(CampusOperations.CAMPUS_CREATE)
  async campusCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(CampusOperations.CAMPUS_CREATE) dto: Dto.ICampusInputDto) {
    return this.campusService.campusCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(CampusOperations.CAMPUS_UPDATE)
  async campusUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CampusOperations.CAMPUS_UPDATE, 'id')
    id: string,
    @HttpDtoBody(CampusOperations.CAMPUS_UPDATE)
    dto: Omit<Dto.ICampusUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.ICampusUpdateDto = {
      ...dto,
      id,
    };

    return this.campusService.campusUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(CampusOperations.CAMPUS_DELETE_ONE_BY_ID)
  async campusDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CampusOperations.CAMPUS_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.campusService.campusDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
