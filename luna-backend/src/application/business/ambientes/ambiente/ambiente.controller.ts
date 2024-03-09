import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessHttp, DtoOperationCreate, DtoOperationDelete, DtoOperationFindAll, DtoOperationFindOne, DtoOperationUpdate, HttpDtoBody, HttpDtoParam } from '../../../../infrastructure';
import { AmbienteService } from './ambiente.service';
import { AmbienteOperations } from './dtos/ambiente.operations';

@ApiTags('Ambientes')
@Controller('/ambientes')
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  //

  @Get('/')
  @DtoOperationFindAll(AmbienteOperations.AMBIENTE_FIND_ALL)
  async ambienteFindAll(@ClientAccessHttp() clientAccess: IClientAccess): Promise<Dto.IAmbienteFindOneResultDto[]> {
    return this.ambienteService.ambienteFindAll(clientAccess);
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(AmbienteOperations.AMBIENTE_FIND_ONE_BY_ID)
  async ambienteFindById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(AmbienteOperations.AMBIENTE_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(clientAccess, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(AmbienteOperations.AMBIENTE_CREATE)
  async ambienteCreate(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(AmbienteOperations.AMBIENTE_CREATE) dto: Dto.IAmbienteInputDto) {
    return this.ambienteService.ambienteCreate(clientAccess, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(AmbienteOperations.AMBIENTE_UPDATE)
  async ambienteUpdate(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(AmbienteOperations.AMBIENTE_UPDATE, 'id')
    id: string,
    @HttpDtoBody(AmbienteOperations.AMBIENTE_UPDATE)
    dto: Omit<Dto.IAmbienteUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IAmbienteUpdateDto = {
      ...dto,
      id,
    };

    return this.ambienteService.ambienteUpdate(clientAccess, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(AmbienteOperations.AMBIENTE_DELETE_ONE_BY_ID)
  async ambienteDeleteOneById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(AmbienteOperations.AMBIENTE_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.ambienteService.ambienteDeleteOneById(clientAccess, { id });
  }

  //
}
