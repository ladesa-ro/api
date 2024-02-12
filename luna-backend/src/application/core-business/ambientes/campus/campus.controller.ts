import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ICampusFindOneResultDto,
  ICampusInputDto,
  IRequestContext,
} from '../../../../domain';
import {
  DtoOperationCreate,
  DtoOperationFindAll,
  DtoOperationFindOne,
  HttpDtoBody,
  HttpDtoParam,
  ResolveRequestContextHttp,
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
  async campusFindAll(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
  ): Promise<ICampusFindOneResultDto[]> {
    return this.campusService.campusFindAll(requestContext);
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
  async campusFindById(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpDtoParam(CampusOperations.CAMPUS_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.campusService.campusFindByIdStrict(requestContext, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(CampusOperations.CAMPUS_CREATE)
  async campusCreate(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpDtoBody(CampusOperations.CAMPUS_CREATE) dto: ICampusInputDto,
  ) {
    return this.campusService.campusCreate(requestContext, dto);
  }

  //
}
