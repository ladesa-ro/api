import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { DisciplinaOperations } from './dtos';
import { DisciplinaDto } from './dtos/disciplina.dto';
import { DisciplinaService } from './disciplina.service';

@Resolver(() => DisciplinaDto)
export class DisciplinaResolver {
  constructor(
    //
    private disciplinaService: DisciplinaService,
  ) {}

  //

  @DtoOperationGqlQuery(DisciplinaOperations.DISCIPLINA_FIND_ALL)
  async disciplinaFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(DisciplinaOperations.DISCIPLINA_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.disciplinaService.disciplinaFindAll(clientAccess, dto);
  }

  //

  @DtoOperationGqlQuery(DisciplinaOperations.DISCIPLINA_FIND_ONE_BY_ID)
  async disciplinaFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(DisciplinaOperations.DISCIPLINA_FIND_ONE_BY_ID)
    dto: Dto.IDisciplinaFindOneByIdInputDto,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(DisciplinaOperations.DISCIPLINA_CREATE)
  async disciplinaCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(DisciplinaOperations.DISCIPLINA_CREATE) dto: Dto.IDisciplinaInputDto) {
    return this.disciplinaService.disciplinaCreate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(DisciplinaOperations.DISCIPLINA_UPDATE)
  async disciplinaUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(DisciplinaOperations.DISCIPLINA_UPDATE) dto: Dto.IDisciplinaUpdateDto) {
    return this.disciplinaService.disciplinaUpdate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(DisciplinaOperations.DISCIPLINA_DELETE_ONE_BY_ID)
  async disciplinaDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(DisciplinaOperations.DISCIPLINA_DELETE_ONE_BY_ID)
    dto: Dto.IDisciplinaDeleteOneByIdInputDto,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(clientAccess, dto);
  }
}
