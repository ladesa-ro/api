import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { CursoService } from './curso.service';

@Resolver()
export class CursoResolver {
  constructor(
    //
    private cursoService: CursoService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Curso.Operations.List)
  async cursoFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CursoListCombinedInput,
  ) {
    return this.cursoService.cursoFindAll(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Curso.Operations.FindById)
  async cursoFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CursoFindByIDCombinedInput,
  ) {
    return this.cursoService.cursoFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.Curso.Operations.Create)
  async cursoCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CursoCreateCombinedInput,
  ) {
    return this.cursoService.cursoCreate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Curso.Operations.Create)
  async cursoUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CursoUpdateByIDCombinedInput,
  ) {
    return this.cursoService.cursoUpdate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Curso.Operations.DeleteById)
  async cursoDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CursoDeleteByIDCombinedInput,
  ) {
    return this.cursoService.cursoDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }
}
