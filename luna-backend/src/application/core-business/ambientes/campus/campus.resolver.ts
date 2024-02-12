import { Resolver } from '@nestjs/graphql';
import {
  ICampusFindOneByIdInputDto,
  IRequestContext,
} from '../../../../domain';
import {
  DtoGqlInput,
  DtoOperationGql,
  ResolveRequestContextGraphQl,
} from '../../../../infrastructure';
import { CampusService } from './campus.service';
import {
  CampusDto,
  CampusFindOneByIdInputDto,
  CampusFindOneByIdInputValidationContract,
  CampusOperations,
} from './dtos';

@Resolver(() => CampusDto)
export class CampusResolver {
  constructor(
    //
    private campusService: CampusService,
  ) {}

  //

  @DtoOperationGql(CampusOperations.CAMPUS_FIND_ALL)
  async campusFindAll(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
  ) {
    return this.campusService.findAll(requestContext);
  }

  //

  @DtoOperationGql(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
  async campusFindOneById(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
    @DtoGqlInput({
      type: () => CampusFindOneByIdInputDto,
      validationContract: CampusFindOneByIdInputValidationContract,
    })
    dto: ICampusFindOneByIdInputDto,
  ) {
    return this.campusService.findByIdStrict(requestContext, dto);
  }
}
