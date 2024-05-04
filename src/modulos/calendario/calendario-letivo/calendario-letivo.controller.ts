import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { HttpDtoBody } from '../../../legacy';
import { CalendarioLetivoService } from './calendario-letivo.service';

@ApiTags('Calendarios Letivos')
@Controller('/calendarios-letivos')
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get('/')
  @Operacao(Spec.CalendarioLetivoFindAllOperator())
  async calendarioFindAll(
    @ContextoDeAcessoHttp() clienttAcess: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CalendarioLetivoFindAllOperator()) dto: Spec.IPaginatedInputDto,
  ): Promise<Spec.ICalendarioLetivoFindAllResultDto> {
    return this.calendarioLetivoService.calendarioLetivoFindAll(clienttAcess, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.CalendarioLetivoFindOneByIdOperator())
  async calendarioLetivoFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CalendarioLetivoFindOneByIdOperator())
    { id }: Spec.ICalendarioLetivoFindOneByIdInputDto,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.CalendarioLetivoCreateOperator())
  async campusCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.CalendarioLetivoCreateOperator()) dto: Spec.ICalendarioLetivoInputDto) {
    return this.calendarioLetivoService.calendarioLetivoCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.CalendarioLetivoUpdateOperator())
  async calendarioLetivoUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CalendarioLetivoUpdateOperator())
    { id, ...dto }: Spec.ICalendarioLetivoUpdateDto,
  ) {
    const dtoUpdate: Spec.ICalendarioLetivoUpdateDto = {
      ...dto,
      id,
    };

    return this.calendarioLetivoService.calendarioLetivoUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.CalendarioLetivoDeleteOperator())
  async CalendarioLetivoDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CalendarioLetivoFindOneByIdOperator())
    { id }: Spec.ICalendarioLetivoFindOneByIdInputDto,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
