import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessContext, AccessContextHttp } from '../../../access-context';
import { CombinedInput, Operation } from '../../../fixtures';
import { TurmaService } from './turma.service';

@ApiTags('Turmas')
@Controller('/turmas')
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.Turma.Operations.List)
  async turmaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaListCombinedInput,
  ): Promise<LadesaTypings.TurmaListCombinedSuccessOutput['body']> {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Turma.Operations.FindById)
  async turmaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaFindByIDCombinedInput,
  ) {
    return this.turmaService.turmaFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Turma.Operations.Create)
  async turmaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaCreateCombinedInput,
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Turma.Operations.Create)
  async turmaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaUpdateByIDCombinedInput,
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }

  //

  @Get('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Turma.Operations.GetCoverImage)
  async turmaGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.turmaService.turmaGetImagemCapa(accessContext, id);
  }

  @Put('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Turma.Operations.SetCoverImage)
  async turmaImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.turmaService.turmaUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Turma.Operations.DeleteById)
  async turmaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDeleteByIDCombinedInput,
  ) {
    return this.turmaService.turmaDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
