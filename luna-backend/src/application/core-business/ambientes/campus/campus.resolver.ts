import { Resolver } from '@nestjs/graphql';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { CampusService } from './campus.service';
import { CampusDto, CampusOperations } from './dtos';
import { ICampusFindOneByIdInputDto, ICampusInputDto, ICampusUpdateDto, ICampusDeleteOneByIdInputDto } from '../../(dtos)';

@Resolver(() => CampusDto)
export class CampusResolver {
  constructor(
    //
    private campusService: CampusService,
  ) {}

  //

  @DtoOperationGqlQuery(CampusOperations.CAMPUS_FIND_ALL)
  async campusFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess) {
    return this.campusService.campusFindAll(clientAccess);
  }

  //

  @DtoOperationGqlQuery(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
  async campusFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
    dto: ICampusFindOneByIdInputDto,
  ) {
    return this.campusService.campusFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(CampusOperations.CAMPUS_CREATE)
  async campusCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(CampusOperations.CAMPUS_CREATE) dto: ICampusInputDto) {
    return this.campusService.campusCreate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(CampusOperations.CAMPUS_UPDATE)
  async campusUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(CampusOperations.CAMPUS_UPDATE) dto: ICampusUpdateDto) {
    return this.campusService.campusUpdate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(CampusOperations.CAMPUS_DELETE_ONE_BY_ID)
  async campusDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(CampusOperations.CAMPUS_DELETE_ONE_BY_ID)
    dto: ICampusDeleteOneByIdInputDto,
  ) {
    return this.campusService.campusDeleteOneById(clientAccess, dto);
  }
}
