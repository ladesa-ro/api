import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { HttpDtoBody, HttpDtoParam, getSearchInputFromPaginateQuery } from '../../../legacy';
import { AmbienteService } from './ambiente.service';

@ApiTags('Ambientes')
@Controller('/ambientes')
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  //

  @Get('/')
  @Operacao(Spec.AmbienteFindAllOperator())
  async ambienteFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Spec.IAmbienteFindAllResultDto> {
    return this.ambienteService.ambienteFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @Operacao(Spec.AmbienteFindOneByIdOperator())
  async ambienteFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.AmbienteFindOneByIdOperator(), 'id')
    id: string,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.AmbienteCreateOperator())
  async ambienteCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.AmbienteCreateOperator()) dto: Spec.IAmbienteInputDto) {
    return this.ambienteService.ambienteCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.AmbienteUpdateOperator())
  async ambienteUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.AmbienteUpdateOperator(), 'id')
    id: string,
    @HttpDtoBody(Spec.AmbienteUpdateOperator())
    dto: Omit<Spec.IAmbienteUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Spec.IAmbienteUpdateDto = {
      ...dto,
      id,
    };

    return this.ambienteService.ambienteUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Get('/:id/imagem/capa')
  @Operacao(Spec.AmbienteGetImagemCapaOperator())
  async blocoGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.AmbienteGetImagemCapaOperator(), 'id')
    id: string,
  ) {
    return this.ambienteService.ambienteGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @Operacao(Spec.AmbienteSetImagemCapaOperator())
  async blocoImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.ambienteService.ambienteUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.AmbienteDeleteOperator())
  async ambienteDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.AmbienteDeleteOperator(), 'id')
    id: string,
  ) {
    return this.ambienteService.ambienteDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
