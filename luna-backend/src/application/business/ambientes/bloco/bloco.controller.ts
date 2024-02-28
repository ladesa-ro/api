import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '../../(dtos)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessHttp, DtoOperationCreate, DtoOperationDelete, DtoOperationFindAll, DtoOperationFindOne, DtoOperationUpdate, HttpDtoBody, HttpDtoParam } from '../../../../infrastructure';
import { BlocoService } from './bloco.service';
import { BlocoOperations } from './dtos/bloco.operations';

@ApiTags('08 Ambientes / Campus / Bloco')
@Controller('/blocos')
export class BlocoController {
  constructor(private blocoService: BlocoService) {}

  //

  @Get('/')
  @DtoOperationFindAll(BlocoOperations.BLOCO_FIND_ALL)
  async blocoFindAll(@ClientAccessHttp() clientAccess: IClientAccess): Promise<Dto.IBlocoFindOneResultDto[]> {
    return this.blocoService.blocoFindAll(clientAccess);
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(BlocoOperations.BLOCO_FIND_ONE_BY_ID)
  async blocoFindById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(BlocoOperations.BLOCO_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.blocoService.blocoFindByIdStrict(clientAccess, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(BlocoOperations.BLOCO_CREATE)
  async blocoCreate(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(BlocoOperations.BLOCO_CREATE) dto: Dto.IBlocoInputDto) {
    return this.blocoService.blocoCreate(clientAccess, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(BlocoOperations.BLOCO_UPDATE)
  async blocoUpdate(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(BlocoOperations.BLOCO_UPDATE, 'id')
    id: string,
    @HttpDtoBody(BlocoOperations.BLOCO_UPDATE)
    dto: Omit<Dto.IBlocoUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IBlocoUpdateDto = {
      ...dto,
      id,
    };

    return this.blocoService.blocoUpdate(clientAccess, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(BlocoOperations.BLOCO_DELETE_ONE_BY_ID)
  async blocoDeleteOneById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(BlocoOperations.BLOCO_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.blocoService.blocoDeleteOneById(clientAccess, { id });
  }

  //
}
