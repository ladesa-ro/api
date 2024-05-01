import { Resolver } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import type { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infraestrutura';
import { GqlDtoInput } from '../../../../infraestrutura/api-documentate/GqlDtoInput';
import { DiarioProfessorService } from './diario-professor.service';
import { DiarioProfessorOperations } from './dtos';
import { DiarioProfessorDto } from './dtos/diario-professor.dto';

@Resolver(() => DiarioProfessorDto)
export class DiarioProfessorResolver {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  @DtoOperationGqlQuery(DiarioProfessorOperations.DIARIO_PROFESSOR_FIND_ALL)
  async diarioProfessorFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(DiarioProfessorOperations.DIARIO_PROFESSOR_FIND_ALL) dto: Dto.ISearchInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorFindAll(contextoDeAcesso, dto);
  }

  @DtoOperationGqlQuery(DiarioProfessorOperations.DIARIO_PROFESSOR_FIND_ONE_BY_ID)
  async diarioProfessorFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(DiarioProfessorOperations.DIARIO_PROFESSOR_FIND_ONE_BY_ID) dto: Dto.IDiarioProfessorFindOneByIdInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(DiarioProfessorOperations.DIARIO_PROFESSOR_CREATE)
  async diarioProfessorCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(DiarioProfessorOperations.DIARIO_PROFESSOR_CREATE) dto: Dto.IDiarioProfessorInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(DiarioProfessorOperations.DIARIO_PROFESSOR_UPDATE)
  async diarioProfessorUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(DiarioProfessorOperations.DIARIO_PROFESSOR_UPDATE) dto: Dto.IDiarioProfessorUpdateDto,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(DiarioProfessorOperations.DIARIO_PROFESSOR_DELETE_ONE_BY_ID)
  async diarioProfessorDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(DiarioProfessorOperations.DIARIO_PROFESSOR_DELETE_ONE_BY_ID) dto: Dto.IDiarioProfessorDeleteOneByIdInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(contextoDeAcesso, dto);
  }
}
