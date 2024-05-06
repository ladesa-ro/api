import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { AmbienteService } from './ambiente.service';

@ApiTags('Ambientes')
@Controller('/ambientes')
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  //

  @Get('/')
  @Operacao(Spec.AmbienteFindAllOperator())
  async ambienteFindAll(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.AmbienteFindAllOperator()) dto: Spec.IPaginatedInputDto,
  ): Promise<Spec.IAmbienteFindAllResultDto> {
    return this.ambienteService.ambienteFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.AmbienteFindOneByIdOperator())
  async ambienteFindById(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Param('id', ParseUUIDPipe) id: string) {
    return this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.AmbienteCreateOperator())
  async ambienteCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaHttp(Spec.AmbienteCreateOperator()) dto: Spec.IAmbienteInputDto) {
    return this.ambienteService.ambienteCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.AmbienteUpdateOperator())
  async ambienteUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.AmbienteUpdateOperator())
    { ...dto }: Spec.IAmbienteUpdateDto,
    @Param('id', ParseUUIDPipe) id: string,
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
  async blocoGetImagemCapa(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Param('id', ParseUUIDPipe) id: string) {
    return this.ambienteService.ambienteGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @Operacao(Spec.AmbienteSetImagemCapaOperator())
  async blocoImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.ambienteService.ambienteUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.AmbienteDeleteOperator())
  async ambienteDeleteOneById(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Param('id', ParseUUIDPipe) id: string) {
    return this.ambienteService.ambienteDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
