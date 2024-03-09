import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import {
  ClientAccessHttp,
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
  async campusFindAll(@ClientAccessHttp() clientAccess: IClientAccess, @Paginate() query: PaginateQuery): Promise<Dto.ICampusFindAllResultDto> {
    return this.campusService.campusFindAll(clientAccess, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
  async campusFindById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(CampusOperations.CAMPUS_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.campusService.campusFindByIdStrict(clientAccess, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(CampusOperations.CAMPUS_CREATE)
  async campusCreate(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(CampusOperations.CAMPUS_CREATE) dto: Dto.ICampusInputDto) {
    return this.campusService.campusCreate(clientAccess, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(CampusOperations.CAMPUS_UPDATE)
  async campusUpdate(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(CampusOperations.CAMPUS_UPDATE, 'id')
    id: string,
    @HttpDtoBody(CampusOperations.CAMPUS_UPDATE)
    dto: Omit<Dto.ICampusUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.ICampusUpdateDto = {
      ...dto,
      id,
    };

    return this.campusService.campusUpdate(clientAccess, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(CampusOperations.CAMPUS_DELETE_ONE_BY_ID)
  async campusDeleteOneById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(CampusOperations.CAMPUS_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.campusService.campusDeleteOneById(clientAccess, { id });
  }

  //
}
