import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { DiarioOperations } from './dtos';
import { DiarioDto } from './dtos/diario.dto';
import { DiarioService } from './diario.service';

@Resolver(() => DiarioDto)
export class DiarioResolver {
  constructor(
    //
    private diarioService: DiarioService,
  ) {}

  //

  @DtoOperationGqlQuery(DiarioOperations.DIARIO_FIND_ALL)
  async diarioFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(DiarioOperations.DIARIO_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.diarioService.diarioFindAll(clientAccess, dto);
  }

  //

  @DtoOperationGqlQuery(DiarioOperations.DIARIO_FIND_ONE_BY_ID)
  async diarioFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(DiarioOperations.DIARIO_FIND_ONE_BY_ID)
    dto: Dto.IDiarioFindOneByIdInputDto,
  ) {
    return this.diarioService.diarioFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(DiarioOperations.DIARIO_CREATE)
  async diarioCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(DiarioOperations.DIARIO_CREATE) dto: Dto.IDiarioInputDto) {
    return this.diarioService.diarioCreate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(DiarioOperations.DIARIO_UPDATE)
  async diarioUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(DiarioOperations.DIARIO_UPDATE) dto: Dto.IDiarioUpdateDto) {
    return this.diarioService.diarioUpdate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(DiarioOperations.DIARIO_DELETE_ONE_BY_ID)
  async diarioDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(DiarioOperations.DIARIO_DELETE_ONE_BY_ID)
    dto: Dto.IDiarioDeleteOneByIdInputDto,
  ) {
    return this.diarioService.diarioDeleteOneById(clientAccess, dto);
  }
}
