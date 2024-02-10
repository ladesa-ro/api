import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  IBaseCidadeFindOneResultDto,
  IRequestContext,
} from '../../../../domain';
import {
  HttpParamYup,
  ResolveRequestContextHttp,
  getSchemaField,
} from '../../../../infrastructure';
import { CidadeService } from './cidade.service';
import { CidadeFindOneByIdInputContract, CidadeFindOneResultDto } from './dtos';

@ApiTags('ambientes')
@Controller('/base/cidades')
export class CidadeController {
  constructor(
    //
    private cidadeService: CidadeService,
  ) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: [CidadeFindOneResultDto],
    description:
      'Lista de todas as cidades brasileiros cadastrados no sistema.',
  })
  async findAll(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
  ): Promise<IBaseCidadeFindOneResultDto[]> {
    return this.cidadeService.findAll(requestContext);
  }

  @Get('/id-:id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: CidadeFindOneResultDto,
    description: 'Retorna a consulta a uma cidade por ID IBGE.',
  })
  @ApiResponse({
    status: 404,
    description: 'Registro não encontrado.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID IBGE da cidade.',
  })
  async findById(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpParamYup('id', getSchemaField(CidadeFindOneByIdInputContract(), 'id'))
    id: number,
  ) {
    return this.cidadeService.findByIdStrict(requestContext, { id });
  }
}
