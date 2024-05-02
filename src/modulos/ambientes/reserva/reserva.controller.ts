import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { HttpDtoBody, HttpDtoParam, getSearchInputFromPaginateQuery } from '../../../legacy';
import { ReservaService } from './reserva.service';

@ApiTags('Reservas')
@Controller('/reservas')
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  //

  @Get('/')
  @Operacao(Spec.ReservaFindAllOperator())
  async reservaFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Spec.IReservaFindAllResultDto> {
    return this.reservaService.reservaFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @Operacao(Spec.ReservaFindOneByIdOperator())
  async reservaFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.ReservaFindOneByIdOperator(), 'id')
    id: string,
  ) {
    return this.reservaService.reservaFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.ReservaCreateOperator())
  async reservaCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.ReservaCreateOperator()) dto: Spec.IReservaInputDto) {
    return this.reservaService.reservaCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.ReservaUpdateOperator())
  async reservaUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.ReservaUpdateOperator(), 'id')
    id: string,
    @HttpDtoBody(Spec.ReservaUpdateOperator())
    dto: Omit<Spec.IReservaUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Spec.IReservaUpdateDto = {
      ...dto,
      id,
    };

    return this.reservaService.reservaUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.ReservaDeleteOperator())
  async reservaDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.ReservaDeleteOperator(), 'id')
    id: string,
  ) {
    return this.reservaService.reservaDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
