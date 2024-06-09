import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaGql, Operacao } from '../../../legacy/especificacao';
import { CursoDto } from './curso.dtos';
import { CursoService } from './curso.service';

@Resolver(() => CursoDto)
export class CursoResolver {
  constructor(
    //
    private cursoService: CursoService,
  ) {}

  //

  @Operacao(Spec.CursoFindAllOperator())
  async cursoFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.CursoFindAllOperator()) dto: Spec.IPaginatedInputDto) {
    return this.cursoService.cursoFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.CursoFindOneByIdOperator())
  async cursoFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.CursoFindOneByIdOperator())
    dto: Spec.ICursoFindOneByIdInputDto,
  ) {
    return this.cursoService.cursoFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.CursoCreateOperator())
  async cursoCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.CursoCreateOperator()) dto: Spec.ICursoInputDto) {
    return this.cursoService.cursoCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.CursoUpdateOperator())
  async cursoUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.CursoUpdateOperator()) dto: Spec.ICursoUpdateDto) {
    return this.cursoService.cursoUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.CursoDeleteOperator())
  async cursoDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.CursoDeleteOperator())
    dto: Spec.ICursoDeleteOneByIdInputDto,
  ) {
    return this.cursoService.cursoDeleteOneById(contextoDeAcesso, dto);
  }
}
