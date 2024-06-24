import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { DiarioProfessorService } from './diario-professor.service';

@ApiTags('DiarioProfessor')
@Controller('/diario-professor')
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.List)
  async diarioProfessorFindAll(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorListCombinedInput,
  ): Promise<LadesaTypings.DiarioProfessorListCombinedSuccessOutput['body']> {
    return this.diarioProfessorService.diarioProfessorFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.FindById)
  async diarioProfessorFindById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorFindByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.Create)
  async diarioProfessorCreate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorCreateCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.Create)
  async diarioProfessorUpdate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorUpdateByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(contextoDeAcesso, dto);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.DeleteById)
  async diarioProfessorDeleteOneById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorDeleteByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }

  //
}
