import { AccessContext, AccessContextHttp } from '@/access-context';
import { CombinedInput, Operation } from '@/app-standards';
import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservaService } from './reserva.service';

@ApiTags('Reservas')
@Controller('/reservas')
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.Reserva.Operations.List)
  async reservaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaListCombinedInput,
  ): Promise<LadesaTypings.ReservaListCombinedSuccessOutput['body']> {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Reserva.Operations.FindById)
  async reservaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaFindByIDCombinedInput,
  ) {
    return this.reservaService.reservaFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Reserva.Operations.Create)
  async reservaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaCreateCombinedInput,
  ) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Reserva.Operations.UpdateById)
  async reservaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaUpdateByIDCombinedInput,
  ) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Reserva.Operations.DeleteById)
  async reservaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaDeleteByIDCombinedInput,
  ) {
    return this.reservaService.reservaDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
