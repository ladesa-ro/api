import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaGql, Operacao } from '../../../legacy/especificacao';
import { CalendarioLetivoDto } from './calendario-letivo.dtos';
import { CalendarioLetivoService } from './calendario-letivo.service';
@Resolver(() => CalendarioLetivoDto)
export class CalendarioLetivoResolver {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  //

  @Operacao(Spec.CalendarioLetivoFindAllOperator())
  async calendarioLetivoFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.CalendarioLetivoFindAllOperator()) dto: Spec.IPaginatedInputDto) {
    return this.calendarioLetivoService.calendarioLetivoFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.CalendarioLetivoFindOneByIdOperator())
  async calendarioLetivoFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.CalendarioLetivoFindOneByIdOperator())
    dto: Spec.ICalendarioLetivoFindOneByIdInputDto,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.CalendarioLetivoCreateOperator())
  async calendarioLetivoCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.CalendarioLetivoCreateOperator()) dto: Spec.ICalendarioLetivoInputDto) {
    return this.calendarioLetivoService.calendarioLetivoCreate(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.CalendarioLetivoUpdateOperator())
  async calendarioLetivoUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.CalendarioLetivoUpdateOperator()) dto: Spec.ICalendarioLetivoUpdateDto) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.CalendarioLetivoDeleteOperator())
  async calendarioLetivoDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.CalendarioLetivoDeleteOperator())
    dto: Spec.ICalendarioLetivoDeleteOneByIdInputDto,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(contextoDeAcesso, dto);
  }
}
