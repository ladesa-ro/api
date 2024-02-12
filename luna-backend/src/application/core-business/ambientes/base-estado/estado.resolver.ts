import { Resolver } from '@nestjs/graphql';
import {
  IEstadoFindOneByIdInputDto,
  IEstadoFindOneByUfInputDto,
  IRequestContext,
} from '../../../../domain';
import {
  DtoOperationGqlQuery,
  GqlDtoInput,
  ResolveRequestContextGraphQl,
} from '../../../../infrastructure';
import { EstadoOperations } from './dtos/estado.operations';
import { EstadoService } from './estado.service';

@Resolver()
export class EstadoResolver {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @DtoOperationGqlQuery(EstadoOperations.ESTADO_FIND_ALL)
  async estadoFindAll(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
  ) {
    return this.estadoService.findAll(requestContext);
  }

  @DtoOperationGqlQuery(EstadoOperations.ESTADO_FIND_ONE_BY_UF)
  async estadoFindOneByUf(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,

    @GqlDtoInput(EstadoOperations.ESTADO_FIND_ONE_BY_UF)
    dto: IEstadoFindOneByUfInputDto,
  ) {
    return this.estadoService.findByUfStrict(requestContext, dto);
  }

  @DtoOperationGqlQuery(EstadoOperations.ESTADO_FIND_ONE_BY_ID)
  async estadoFindOneById(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
    @GqlDtoInput(EstadoOperations.ESTADO_FIND_ONE_BY_ID)
    dto: IEstadoFindOneByIdInputDto,
  ) {
    return this.estadoService.findByIdStrict(requestContext, dto);
  }
}
