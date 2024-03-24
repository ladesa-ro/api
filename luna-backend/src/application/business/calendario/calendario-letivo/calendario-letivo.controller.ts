import { Controller, Delete, Get, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ClientAccessHttp, DtoOperationDelete, DtoOperationFindAll, DtoOperationFindOne, DtoOperationUpdate, HttpDtoBody, HttpDtoParam, getSearchInputFromPaginateQuery } from "infrastructure";
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';

import { Paginate, PaginateQuery } from "nestjs-paginate";
import { CalendarioLetivoService } from "./calendario-letivo.service";
import { CalendarioLetivoOperations } from "./dtos/calendario-letivo.operations";


// GET https://localhost:3000/calendario-letivo/
@ApiTags('Calendarios Letivos')
@Controller("/calendario-letivo")
export class CalendarioLetivoController {
    constructor(private calendarioLetivoService: CalendarioLetivoService) { }

    @Get("/")
    @DtoOperationFindAll(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ALL)
    async calendarioFindAll(@ClientAccessHttp() clienttAcess: IClientAccess, @Paginate() query: PaginateQuery): Promise<Dto.ICalendarioLetivoFindAllResultDto> {
        return this.calendarioLetivoService.calendarioLetivoFindAll(clienttAcess, getSearchInputFromPaginateQuery(query));
    }

    //

    @Get('/:id')
    @DtoOperationFindOne(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ONE_BY_ID)
    async calendarioLetivoFindById(
        @ClientAccessHttp() clientAccess: IClientAccess,
        @HttpDtoParam(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ONE_BY_ID, 'id')
        id: string,
    ) {
        return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(clientAccess, { id });
    }

    //

    @Patch('/:id')
    @DtoOperationUpdate(CalendarioLetivoOperations.CALENDARIO_LETIVO_UPDATE)
    async calendarioLetivoUpdate(
        @ClientAccessHttp() clientAccess: IClientAccess,
        @HttpDtoParam(CalendarioLetivoOperations.CALENDARIO_LETIVO_UPDATE, 'id')
        id: string,
        @HttpDtoBody(CalendarioLetivoOperations.CALENDARIO_LETIVO_UPDATE)
        dto: Omit<Dto.ICalendarioLetivoUpdateDto, 'id'>,
    ) {
        const dtoUpdate: Dto.ICalendarioLetivoUpdateDto = {
            ...dto,
            id,
        };

        return this.calendarioLetivoService.calendarioLetivoUpdate(clientAccess, dtoUpdate);
    }

    //

    @Delete('/:id')
    @DtoOperationDelete(CalendarioLetivoOperations.CALENDARIO_LETIVO_DELETE_ONE_BY_ID)
    async CalendarioLetivoDeleteOneById(
        @ClientAccessHttp() clientAccess: IClientAccess,
        @HttpDtoParam(CalendarioLetivoOperations.CALENDARIO_LETIVO_DELETE_ONE_BY_ID, 'id')
        id: string,
    ) {
        return this.calendarioLetivoService.calendarioLetivoDeleteOneById(clientAccess, { id });
    }

    //

}