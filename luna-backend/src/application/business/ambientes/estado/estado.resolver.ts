import { Resolver } from '@nestjs/graphql';
import { IEstadoFindOneByIdInputDto, IEstadoFindOneByUfInputDto, ISearchInputDto } from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlQuery, GqlDtoInput } from '../../../../infrastructure';
import { EstadoOperations } from './dtos/estado.operations';
import { EstadoService } from './estado.service';

@Resolver()
export class EstadoResolver {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  // ========================================================

  @DtoOperationGqlQuery(EstadoOperations.ESTADO_FIND_ALL)
  async estadoFindAll(@ClientAccessGraphQl() clienteAccess: IClientAccess, @GqlDtoInput(EstadoOperations.ESTADO_FIND_ALL) dto: ISearchInputDto) {
    return this.estadoService.findAll(clienteAccess, dto);
  }

  // ========================================================

  @DtoOperationGqlQuery(EstadoOperations.ESTADO_FIND_ONE_BY_UF)
  async estadoFindOneByUf(
    @ClientAccessGraphQl() clienteAccess: IClientAccess,

    @GqlDtoInput(EstadoOperations.ESTADO_FIND_ONE_BY_UF)
    dto: IEstadoFindOneByUfInputDto,
  ) {
    return this.estadoService.findByUfStrict(clienteAccess, dto);
  }

  // ========================================================

  @DtoOperationGqlQuery(EstadoOperations.ESTADO_FIND_ONE_BY_ID)
  async estadoFindOneById(
    @ClientAccessGraphQl() clienteAccess: IClientAccess,
    @GqlDtoInput(EstadoOperations.ESTADO_FIND_ONE_BY_ID)
    dto: IEstadoFindOneByIdInputDto,
  ) {
    return this.estadoService.findByIdStrict(clienteAccess, dto);
  }

  // ========================================================
}
