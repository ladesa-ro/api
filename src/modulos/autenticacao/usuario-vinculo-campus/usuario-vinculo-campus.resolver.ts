import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { GqlDtoInput } from '../../../legacy';
import { VinculoService } from './usuario-vinculo-campus.service';

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
  async vinculoSetVinculos(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.VinculoUpdateOperator()) dto: Spec.VinculoUpdateInputDto) {
    return this.vinculoService.vinculoSetVinculos(contextoDeAcesso, dto);
  }
}
