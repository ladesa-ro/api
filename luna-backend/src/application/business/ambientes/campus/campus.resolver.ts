import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(dtos)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { CampusService } from './campus.service';
import { CampusDto, CampusOperations } from './dtos';

@Resolver(() => CampusDto)
export class CampusResolver {
  constructor(
    //
    private campusService: CampusService,
  ) {}

  //

  @DtoOperationGqlQuery(CampusOperations.CAMPUS_FIND_ALL)
  async campusFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(CampusOperations.CAMPUS_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.campusService.campusFindAll(clientAccess, dto);
  }

  //

  @DtoOperationGqlQuery(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
  async campusFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
    dto: Dto.ICampusFindOneByIdInputDto,
  ) {
    return this.campusService.campusFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(CampusOperations.CAMPUS_CREATE)
  async campusCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(CampusOperations.CAMPUS_CREATE) dto: Dto.ICampusInputDto) {
    return this.campusService.campusCreate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(CampusOperations.CAMPUS_UPDATE)
  async campusUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(CampusOperations.CAMPUS_UPDATE) dto: Dto.ICampusUpdateDto) {
    return this.campusService.campusUpdate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(CampusOperations.CAMPUS_DELETE_ONE_BY_ID)
  async campusDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(CampusOperations.CAMPUS_DELETE_ONE_BY_ID)
    dto: Dto.ICampusDeleteOneByIdInputDto,
  ) {
    return this.campusService.campusDeleteOneById(clientAccess, dto);
  }
}
