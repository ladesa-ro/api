import { Controller, Get } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ICidadeFindOneResultDto, IRequestContext } from '../../../../domain';
import {
  DtoOperationFindAll,
  DtoOperationFindOne,
  HttpParam,
  ResolveRequestContextHttp,
  createValidationContractPickField,
} from '../../../../infrastructure';
import { CidadeService } from './cidade.service';
import {
  CidadeFindOneByIdInputValidationContract,
  CidadeOperations,
} from './dtos';

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

  @Get('/id-:id')
  @DtoOperationFindOne(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
  @ApiParam({
    name: 'id',
    description: 'ID IBGE da cidade.',
  })
  async findById(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpParam(
      'id',
      createValidationContractPickField(
        CidadeFindOneByIdInputValidationContract,
        'id',
      ),
    )
    id: number,
  ) {
    return this.cidadeService.findByIdStrict(requestContext, { id });
  }
}
