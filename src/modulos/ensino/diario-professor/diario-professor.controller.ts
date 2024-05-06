import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { DiarioProfessorService } from './diario-professor.service';

@ApiTags('DiarioProfessor')
@Controller('/diario-professor')
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  //

  @Get('/')
  @Operacao(Spec.DiarioProfessorFindAllOperator())
  async diarioProfessorFindAll(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.DiarioProfessorFindAllOperator()) dto: Spec.IPaginatedInputDto,
  ): Promise<Spec.IDiarioProfessorFindAllResultDto> {
    return this.diarioProfessorService.diarioProfessorFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.DiarioProfessorFindOneByIdOperator())
  async diarioProfessorFindById(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Param('id', ParseUUIDPipe) id: string) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.DiarioProfessorCreateOperator())
  async diarioProfessorCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaHttp(Spec.DiarioProfessorCreateOperator()) dto: Spec.IDiarioProfessorInputDto) {
    return this.diarioProfessorService.diarioProfessorCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.DiarioProfessorUpdateOperator())
  async diarioProfessorUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.DiarioProfessorUpdateOperator())
    { ...dto }: Spec.IDiarioProfessorUpdateDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const dtoUpdate: Spec.IDiarioProfessorUpdateDto = {
      ...dto,
      id,
    };

    return this.diarioProfessorService.diarioProfessorUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.DiarioProfessorDeleteOperator())
  async diarioProfessorDeleteOneById(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Param('id', ParseUUIDPipe) id: string) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
