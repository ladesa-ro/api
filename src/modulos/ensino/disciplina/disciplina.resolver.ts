import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { GqlDtoInput } from '../../../legacy';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaDto } from './disciplina.dtos';

@Resolver(() => DisciplinaDto)
export class DisciplinaResolver {
  constructor(
    //
    private disciplinaService: DisciplinaService,
  ) {}

  //

  @Operacao(Spec.DisciplinaFindAllOperator())
  async disciplinaFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.DisciplinaFindAllOperator()) dto: Spec.ISearchInputDto) {
    return this.disciplinaService.disciplinaFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.DisciplinaFindOneByIdOperator())
  async disciplinaFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.DisciplinaFindOneByIdOperator())
    dto: Spec.IDisciplinaFindOneByIdInputDto,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.DisciplinaCreateOperator())
  async disciplinaCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.DisciplinaCreateOperator()) dto: Spec.IDisciplinaInputDto) {
    return this.disciplinaService.disciplinaCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DisciplinaUpdateOperator())
  async disciplinaUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.DisciplinaUpdateOperator()) dto: Spec.IDisciplinaUpdateDto) {
    return this.disciplinaService.disciplinaUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DisciplinaDeleteOperator())
  async disciplinaDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.DisciplinaDeleteOperator())
    dto: Spec.IDisciplinaDeleteOneByIdInputDto,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(contextoDeAcesso, dto);
  }
}
