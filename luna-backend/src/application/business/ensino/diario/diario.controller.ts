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
import { DiarioOperations } from './dtos';
import { DiarioService } from './diario.service';

@ApiTags('Diarios')
@Controller('/diarios')
export class DiarioController {
  constructor(private diarioService: DiarioService) {}

  //

  @Get('/')
  @DtoOperationFindAll(DiarioOperations.DIARIO_FIND_ALL)
  async diarioFindAll(@ClientAccessHttp() clientAccess: IClientAccess, @Paginate() query: PaginateQuery): Promise<Dto.IDiarioFindAllResultDto> {
    return this.diarioService.diarioFindAll(clientAccess, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(DiarioOperations.DIARIO_FIND_ONE_BY_ID)
  async diarioFindById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(DiarioOperations.DIARIO_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.diarioService.diarioFindByIdStrict(clientAccess, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(DiarioOperations.DIARIO_CREATE)
  async diarioCreate(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(DiarioOperations.DIARIO_CREATE) dto: Dto.IDiarioInputDto) {
    return this.diarioService.diarioCreate(clientAccess, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(DiarioOperations.DIARIO_UPDATE)
  async diarioUpdate(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(DiarioOperations.DIARIO_UPDATE, 'id')
    id: string,
    @HttpDtoBody(DiarioOperations.DIARIO_UPDATE)
    dto: Omit<Dto.IDiarioUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IDiarioUpdateDto = {
      ...dto,
      id,
    };

    return this.diarioService.diarioUpdate(clientAccess, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(DiarioOperations.DIARIO_DELETE_ONE_BY_ID)
  async diarioDeleteOneById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(DiarioOperations.DIARIO_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.diarioService.diarioDeleteOneById(clientAccess, { id });
  }

  //
}
