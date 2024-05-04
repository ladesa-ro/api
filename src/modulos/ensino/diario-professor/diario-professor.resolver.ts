import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { DadosEntradaGql } from '../../../legacy';
import { DiarioProfessorDto } from './diario-professor.dtos';
import { DiarioProfessorService } from './diario-professor.service';

@Resolver(() => DiarioProfessorDto)
export class DiarioProfessorResolver {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  @Operacao(Spec.DiarioProfessorFindAllOperator())
  async diarioProfessorFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.DiarioProfessorFindAllOperator()) dto: Spec.IPaginatedInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorFindAll(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DiarioProfessorFindOneByIdOperator())
  async diarioProfessorFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.DiarioProfessorFindOneByIdOperator()) dto: Spec.IDiarioProfessorFindOneByIdInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DiarioProfessorCreateOperator())
  async diarioProfessorCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.DiarioProfessorCreateOperator()) dto: Spec.IDiarioProfessorInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DiarioProfessorUpdateOperator())
  async diarioProfessorUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.DiarioProfessorUpdateOperator()) dto: Spec.IDiarioProfessorUpdateDto,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DiarioProfessorDeleteOperator())
  async diarioProfessorDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.DiarioProfessorDeleteOperator()) dto: Spec.IDiarioProfessorDeleteOneByIdInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(contextoDeAcesso, dto);
  }
}
