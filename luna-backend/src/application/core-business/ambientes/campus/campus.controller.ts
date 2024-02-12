import { Controller, Get } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ICampusFindOneResultDto, IRequestContext } from '../../../../domain';
import {
  DtoOperationFindAll,
  DtoOperationFindOne,
  HttpParam,
  ResolveRequestContextHttp,
  ValidationContractUuid,
} from '../../../../infrastructure';
import { CampusService } from './campus.service';
import { CampusOperations } from './dtos/campus.operations';

@ApiTags('ambientes')
@Controller('/campi')
export class CampusController {
  constructor(private campusService: CampusService) {}

  //

  @Get('/')
  @DtoOperationFindAll(CampusOperations.CAMPUS_FIND_ALL)
  async findAll(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
  ): Promise<ICampusFindOneResultDto[]> {
    return this.campusService.findAll(requestContext);
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
  @ApiParam({
    name: 'id',
    description: 'ID do campus.',
  })
  async findById(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpParam('id', ValidationContractUuid)
    id: string,
  ) {
    return this.campusService.findByIdStrict(requestContext, { id });
  }
}
