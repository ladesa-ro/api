import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { HttpDtoBody, HttpDtoParam, getSearchInputFromPaginateQuery } from '../../../legacy';
import { CalendarioLetivoService } from './calendario-letivo.service';
import { Operacao } from '../../../especificacao';

@ApiTags('Calendarios Letivos')
@Controller('/calendarios-letivos')
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get('/')
  @Operacao(Spec.CalendarioLetivoFindAllOperator())
  async calendarioFindAll(@ContextoDeAcessoHttp() clienttAcess: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Spec.ICalendarioLetivoFindAllResultDto> {
    return this.calendarioLetivoService.calendarioLetivoFindAll(clienttAcess, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @Operacao(Spec.CalendarioLetivoFindOneByIdOperator())
  async calendarioLetivoFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.CalendarioLetivoFindOneByIdOperator(), 'id')
    id: string,
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
    @HttpDtoParam(Spec.CalendarioLetivoUpdateOperator(), 'id')
    id: string,
    @HttpDtoBody(Spec.CalendarioLetivoUpdateOperator())
    dto: Omit<Spec.ICalendarioLetivoUpdateDto, 'id'>,
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
    @HttpDtoParam(Spec.CalendarioLetivoDeleteOperator(), 'id')
    id: string,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
