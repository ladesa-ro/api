import type * as LadesaTypings from '@ladesa-ro/especificacao';
import { Tokens } from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { CombinedInput } from '../../../especificacao/ladesa';
import { Operation } from '../../../especificacao/ladesa/operation';
import { AmbienteService } from './ambiente.service';

@ApiTags('Ambientes')
@Controller('/ambientes')
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @Get('/')
  @Operation(Tokens.Ambiente.Operations.List)
  async ambienteFindAll(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() combinedInput: LadesaTypings.AmbienteListCombinedInput,
  ): Promise<LadesaTypings.AmbienteListCombinedSuccessOutput['body']> {
    return this.ambienteService.ambienteFindAll(contextoDeAcesso, combinedInput) as any;
  }

  //

  @Get('/:id')
  @Operacao(Spec.AmbienteFindOneByIdOperator())
  async ambienteFindById(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Param('id', ParseUUIDPipe) id: string) {
    return this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id });
  }

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
