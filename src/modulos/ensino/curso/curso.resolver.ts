import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntrada } from '../../../legacy';
import { CursoDto } from './curso.dtos';
import { CursoService } from './curso.service';

import { Operacao } from '../../../especificacao';

@Resolver(() => CursoDto)
export class CursoResolver {
  constructor(
    //
    private cursoService: CursoService,
  ) {}

  //

  @Operacao(Spec.CursoFindAllOperator())
  async cursoFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntrada(Spec.CursoFindAllOperator()) dto: Spec.ISearchInputDto) {
    return this.cursoService.cursoFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.CursoFindOneByIdOperator())
  async cursoFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntrada(Spec.CursoFindOneByIdOperator())
    dto: Spec.ICursoFindOneByIdInputDto,
  ) {
    return this.cursoService.cursoFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.CursoCreateOperator())
  async cursoCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntrada(Spec.CursoCreateOperator()) dto: Spec.ICursoInputDto) {
    return this.cursoService.cursoCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.CursoUpdateOperator())
  async cursoUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntrada(Spec.CursoUpdateOperator()) dto: Spec.ICursoUpdateDto) {
    return this.cursoService.cursoUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.CursoDeleteOperator())
  async cursoDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntrada(Spec.CursoDeleteOperator())
    dto: Spec.ICursoDeleteOneByIdInputDto,
  ) {
    return this.cursoService.cursoDeleteOneById(contextoDeAcesso, dto);
  }
}
