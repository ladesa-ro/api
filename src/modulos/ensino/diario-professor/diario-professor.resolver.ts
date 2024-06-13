import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { DiarioProfessorService } from './diario-professor.service';

@Resolver()
export class DiarioProfessorResolver {
  constructor(private diarioProfessorService: DiarioProfessorService) {}
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.List)
  async diarioProfessorFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorListCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindAll(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.FindById)
  async diarioProfessorFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorFindByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.Create)
  async diarioProfessorCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorCreateCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.Create)
  async diarioProfessorUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorUpdateByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.DeleteById)
  async diarioProfessorDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorDeleteByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }
}
