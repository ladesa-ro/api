import { Resolver } from '@nestjs/graphql';
import {
  ICampusFindOneByIdInputDto,
  ICampusInputDto,
  ICampusUpdateDto,
  IRequestContext,
} from '../../../../domain';
import {
  DtoOperationGqlMutation,
  DtoOperationGqlQuery,
  ResolveRequestContextGraphQl,
} from '../../../../infrastructure';
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
  async campusFindAll(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
  ) {
    return this.campusService.campusFindAll(requestContext);
  }

  //

  @DtoOperationGqlQuery(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
  async campusFindOneById(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
    @GqlDtoInput(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
    dto: ICampusFindOneByIdInputDto,
  ) {
    return this.campusService.campusFindByIdStrict(requestContext, dto);
  }

  //

  @DtoOperationGqlMutation(CampusOperations.CAMPUS_CREATE)
  async campusCreate(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
    @GqlDtoInput(CampusOperations.CAMPUS_CREATE) dto: ICampusInputDto,
  ) {
    return this.campusService.campusCreate(requestContext, dto);
  }

  @DtoOperationGqlMutation(CampusOperations.CAMPUS_UPDATE)
  async campusUpdate(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
    @GqlDtoInput(CampusOperations.CAMPUS_UPDATE) dto: ICampusUpdateDto,
  ) {
    return this.campusService.campusUpdate(requestContext, dto);
  }
}
