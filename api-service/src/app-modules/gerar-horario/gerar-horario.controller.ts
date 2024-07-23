import { AccessContext, AccessContextHttp } from '@/access-context';
import { CombinedInput, Operation } from '@/app-standards';
import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Gerar Horario')
@Controller('/gerar-horario')
export class GerarHorarioController {
    constructor() { }

    //

    @Get('/')
    @Operation(LadesaTypings.Tokens.Modalidade.Operations.List)
    async modalidadeFindAll(
    ) {
        return "olá mundo"

    }
    //
}
