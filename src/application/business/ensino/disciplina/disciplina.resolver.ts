import { Resolver } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import type { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaOperations } from './dtos';
import { DisciplinaDto } from './dtos/disciplina.dto';

@Resolver(() => DisciplinaDto)
export class DisciplinaResolver {
  constructor(
    //
    private disciplinaService: DisciplinaService,
  ) {}

  //

  @DtoOperationGqlQuery(DisciplinaOperations.DISCIPLINA_FIND_ALL)
  async disciplinaFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(DisciplinaOperations.DISCIPLINA_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.disciplinaService.disciplinaFindAll(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlQuery(DisciplinaOperations.DISCIPLINA_FIND_ONE_BY_ID)
  async disciplinaFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(DisciplinaOperations.DISCIPLINA_FIND_ONE_BY_ID)
    dto: Dto.IDisciplinaFindOneByIdInputDto,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(DisciplinaOperations.DISCIPLINA_CREATE)
  async disciplinaCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(DisciplinaOperations.DISCIPLINA_CREATE) dto: Dto.IDisciplinaInputDto) {
    return this.disciplinaService.disciplinaCreate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(DisciplinaOperations.DISCIPLINA_UPDATE)
  async disciplinaUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(DisciplinaOperations.DISCIPLINA_UPDATE) dto: Dto.IDisciplinaUpdateDto) {
    return this.disciplinaService.disciplinaUpdate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(DisciplinaOperations.DISCIPLINA_DELETE_ONE_BY_ID)
  async disciplinaDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(DisciplinaOperations.DISCIPLINA_DELETE_ONE_BY_ID)
    dto: Dto.IDisciplinaDeleteOneByIdInputDto,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(contextoDeAcesso, dto);
  }
}
