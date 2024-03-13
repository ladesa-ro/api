import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { TurmaOperations } from './dtos';
import { TurmaDto } from './dtos/turma.dto';
import { TurmaService } from './turma.service';

@Resolver(() => TurmaDto)
export class TurmaResolver {
  constructor(
    //
    private turmaService: TurmaService,
  ) {}

  //

  @DtoOperationGqlQuery(TurmaOperations.TURMA_FIND_ALL)
  async turmaFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(TurmaOperations.TURMA_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.turmaService.turmaFindAll(clientAccess, dto);
  }

  //

  @DtoOperationGqlQuery(TurmaOperations.TURMA_FIND_ONE_BY_ID)
  async turmaFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(TurmaOperations.TURMA_FIND_ONE_BY_ID)
    dto: Dto.ITurmaFindOneByIdInputDto,
  ) {
    return this.turmaService.turmaFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(TurmaOperations.TURMA_CREATE)
  async turmaCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(TurmaOperations.TURMA_CREATE) dto: Dto.ITurmaInputDto) {
    return this.turmaService.turmaCreate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(TurmaOperations.TURMA_UPDATE)
  async turmaUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(TurmaOperations.TURMA_UPDATE) dto: Dto.ITurmaUpdateDto) {
    return this.turmaService.turmaUpdate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(TurmaOperations.TURMA_DELETE_ONE_BY_ID)
  async turmaDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(TurmaOperations.TURMA_DELETE_ONE_BY_ID)
    dto: Dto.ITurmaDeleteOneByIdInputDto,
  ) {
    return this.turmaService.turmaDeleteOneById(clientAccess, dto);
  }
}
