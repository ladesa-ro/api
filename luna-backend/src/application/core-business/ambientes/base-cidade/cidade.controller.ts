import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICidadeFindOneResultDto, IRequestContext } from '../../../../domain';
import {
  DtoOperationFindAll,
  DtoOperationFindOne,
  HttpDtoParam,
  ResolveRequestContextHttp,
} from '../../../../infrastructure';
import { CidadeService } from './cidade.service';
import { CidadeOperations } from './dtos';

@ApiTags('ambientes')
@Controller('/base/cidades')
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  @Get('/')
  @DtoOperationFindAll(CidadeOperations.CIDADE_FIND_ALL)
  async findAll(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
  ): Promise<ICidadeFindOneResultDto[]> {
    return this.cidadeService.findAll(requestContext);
  }

  @Get('/:id')
  @DtoOperationFindOne(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
  async findById(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpDtoParam(CidadeOperations.CIDADE_FIND_ONE_BY_ID, 'id')
    id: number,
  ) {
    return this.cidadeService.findByIdStrict(requestContext, { id });
  }
}
