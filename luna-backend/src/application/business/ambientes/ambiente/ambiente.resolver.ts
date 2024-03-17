import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { AmbienteService } from './ambiente.service';
import { AmbienteDto, AmbienteOperations } from './dtos';

@Resolver(() => AmbienteDto)
export class AmbienteResolver {
  constructor(
    //
    private ambienteService: AmbienteService,
  ) {}

  //

  @DtoOperationGqlQuery(AmbienteOperations.AMBIENTE_FIND_ALL)
  async ambienteFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(AmbienteOperations.AMBIENTE_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.ambienteService.ambienteFindAll(clientAccess, dto);
  }

  //

  @DtoOperationGqlQuery(AmbienteOperations.AMBIENTE_FIND_ONE_BY_ID)
  async ambienteFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(AmbienteOperations.AMBIENTE_FIND_ONE_BY_ID)
    dto: Dto.IAmbienteFindOneByIdInputDto,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(AmbienteOperations.AMBIENTE_CREATE)
  async ambienteCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(AmbienteOperations.AMBIENTE_CREATE) dto: Dto.IAmbienteInputDto) {
    return this.ambienteService.ambienteCreate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(AmbienteOperations.AMBIENTE_UPDATE)
  async ambienteUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(AmbienteOperations.AMBIENTE_UPDATE) dto: Dto.IAmbienteUpdateDto) {
    return this.ambienteService.ambienteUpdate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(AmbienteOperations.AMBIENTE_DELETE_ONE_BY_ID)
  async ambienteDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(AmbienteOperations.AMBIENTE_DELETE_ONE_BY_ID)
    dto: Dto.IAmbienteDeleteOneByIdInputDto,
  ) {
    return this.ambienteService.ambienteDeleteOneById(clientAccess, dto);
  }
}
