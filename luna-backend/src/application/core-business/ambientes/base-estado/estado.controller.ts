import { Controller, Get } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IEstadoFindOneResultDto, IRequestContext } from '../../../../domain';
import {
  DtoOperationFindAll,
  DtoOperationFindOne,
  HttpParam,
  ResolveRequestContextHttp,
  createValidationContractPickField,
} from '../../../../infrastructure';
import {
  EstadoFindOneByIdInputValidationContract,
  EstadoFindOneByUfInputValidationContract,
} from './dtos';
import { EstadoOperations } from './dtos/estado.operations';
import { EstadoService } from './estado.service';

@ApiTags('ambientes')
@Controller('/base/estados')
export class EstadoController {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @Get('/')
  @DtoOperationFindAll(EstadoOperations.ESTADO_FIND_ALL)
  async findAll(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
  ): Promise<IEstadoFindOneResultDto[]> {
    return this.estadoService.findAll(requestContext);
  }

  @Get('/uf-:uf')
  @DtoOperationFindOne(EstadoOperations.ESTADO_FIND_ONE_BY_UF)
  @ApiParam({
    name: 'uf',
    description: 'Sigla do estado.',
  })
  async findByUf(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpParam(
      'uf',
      createValidationContractPickField(
        EstadoFindOneByUfInputValidationContract,
        'uf',
      ),
    )
    uf: string,
  ) {
    return this.estadoService.findByUfStrict(requestContext, { uf });
  }

  @Get('/id-:id')
  @DtoOperationFindOne(EstadoOperations.ESTADO_FIND_ONE_BY_ID)
  @ApiParam({
    name: 'id',
    description: 'ID IBGE do estado.',
  })
  async findById(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpParam(
      'id',
      createValidationContractPickField(
        EstadoFindOneByIdInputValidationContract,
        'id',
      ),
    )
    id: number,
  ) {
    return this.estadoService.findByIdStrict(requestContext, { id });
  }
}
