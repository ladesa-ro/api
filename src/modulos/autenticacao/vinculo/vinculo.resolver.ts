import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaGql, Operacao } from '../../../especificacao';
import { VinculoService } from './vinculo.service';
export class VinculoResolver {
  constructor(
    //
    private vinculoService: VinculoService,
  ) {}

  //

  @Operacao(Spec.VinculoFindAllOperator())
  async vinculoFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso) {
    return this.vinculoService.vinculoFindAll(contextoDeAcesso);
  }

  @Operacao(Spec.VinculoUpdateOperator())
  async vinculoSetVinculos(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.VinculoUpdateOperator()) dto: Spec.IVinculoUpdateInputDto) {
    return this.vinculoService.vinculoSetVinculos(contextoDeAcesso, dto);
  }
}
