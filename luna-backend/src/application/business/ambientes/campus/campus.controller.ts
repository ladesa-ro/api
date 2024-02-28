import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICampusFindOneResultDto, ICampusInputDto, ICampusUpdateDto } from '../../(dtos)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessHttp, DtoOperationCreate, DtoOperationDelete, DtoOperationFindAll, DtoOperationFindOne, DtoOperationUpdate, HttpDtoBody, HttpDtoParam } from '../../../../infrastructure';
import { CampusService } from './campus.service';
import { CampusOperations } from './dtos/campus.operations';

@ApiTags('07 Ambientes / Campus')
@Controller('/campi')
export class CampusController {
  constructor(private campusService: CampusService) {}

  //

  @Get('/')
  @DtoOperationFindAll(CampusOperations.CAMPUS_FIND_ALL)
  async campusFindAll(@ClientAccessHttp() clientAccess: IClientAccess): Promise<ICampusFindOneResultDto[]> {
    return this.campusService.campusFindAll(clientAccess);
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
  async campusCreate(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(CampusOperations.CAMPUS_CREATE) dto: ICampusInputDto) {
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
    dto: Omit<ICampusUpdateDto, 'id'>,
  ) {
    const dtoUpdate: ICampusUpdateDto = {
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
