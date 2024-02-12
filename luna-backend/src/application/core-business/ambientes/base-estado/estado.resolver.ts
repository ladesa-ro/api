import { Resolver } from '@nestjs/graphql';
import {
  IEstadoFindOneByIdInputDto,
  IEstadoFindOneByUfInputDto,
  IRequestContext,
} from '../../../../domain';
import {
  DtoGqlInput,
  DtoOperationGql,
  ResolveRequestContextGraphQl,
} from '../../../../infrastructure';
import {
  EstadoFindOneByIdInputDto,
  EstadoFindOneByIdInputValidationContract,
  EstadoFindOneByUfInputDto,
  EstadoFindOneByUfInputValidationContract,
} from './dtos';
import { EstadoOperations } from './dtos/estado.operations';
import { EstadoService } from './estado.service';

@Resolver()
export class EstadoResolver {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @DtoOperationGql(EstadoOperations.ESTADO_FIND_ALL)
  async estadoFindAll(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
  ) {
    return this.estadoService.findAll(requestContext);
  }

  @DtoOperationGql(EstadoOperations.ESTADO_FIND_ONE_BY_UF)
  async estadoFindOneByUf(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,

    @DtoGqlInput({
      type: () => EstadoFindOneByUfInputDto,
      validationContract: EstadoFindOneByUfInputValidationContract,
    })
    dto: IEstadoFindOneByUfInputDto,
  ) {
    return this.estadoService.findByUfStrict(requestContext, dto);
  }

  @DtoOperationGql(EstadoOperations.ESTADO_FIND_ONE_BY_ID)
  async estadoFindOneById(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
    @DtoGqlInput({
      type: () => EstadoFindOneByIdInputDto,
      validationContract: EstadoFindOneByIdInputValidationContract,
    })
    dto: IEstadoFindOneByIdInputDto,
  ) {
    return this.estadoService.findByIdStrict(requestContext, dto);
  }
}
