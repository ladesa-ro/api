import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { GqlDtoInput } from '../../../legacy';
import { TurmaService } from './turma.service';
import { TurmaDto } from './turma.dtos';

@Resolver(() => TurmaDto)
export class TurmaResolver {
  constructor(
    //
    private turmaService: TurmaService,
  ) {}

  //

  @Operacao(Spec.TurmaFindAllOperator())
  async turmaFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.TurmaFindAllOperator()) dto: Spec.ISearchInputDto) {
    return this.turmaService.turmaFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.TurmaFindOneByIdOperator())
  async turmaFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.TurmaFindOneByIdOperator())
    dto: Spec.ITurmaFindOneByIdInputDto,
  ) {
    return this.turmaService.turmaFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.TurmaCreateOperator())
  async turmaCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.TurmaCreateOperator()) dto: Spec.ITurmaInputDto) {
    return this.turmaService.turmaCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.TurmaUpdateOperator())
  async turmaUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.TurmaUpdateOperator()) dto: Spec.ITurmaUpdateDto) {
    return this.turmaService.turmaUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.TurmaDeleteOperator())
  async turmaDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.TurmaDeleteOperator())
    dto: Spec.ITurmaDeleteOneByIdInputDto,
  ) {
    return this.turmaService.turmaDeleteOneById(contextoDeAcesso, dto);
  }
}
