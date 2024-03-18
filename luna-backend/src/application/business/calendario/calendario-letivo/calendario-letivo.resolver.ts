import { ClientAccessGraphQl, DtoOperationGqlQuery, DtoPropertyMap, GqlDtoInput } from "infrastructure";
import { CalendarioLetivoService } from "./calendario-letivo.service";
import { CalendarioLetivoDto } from "./dtos/calendario-letivo.dto";
import { CalendarioLetivoOperations } from "./dtos/calendario-letivo.operations";
import { IClientAccess } from "../../../../domain";


@Resolver(() => CalendarioLetivoDto)
export class CalendarioLetivoResolver {
    constructor(
        private calendarioLetivoService:CalendarioLetivoService
    ) {}

    //

    @DtoOperationGqlQuery(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ALL)
    async calendarioLetivoFindAll(@ClientAccessGraphQl() cleintAcess: IClientAccess, @GqlDtoInput(CalendarioLetivoOperations.CALENDARIO_LETIVO_FIND_ALL) dto: Dto.ISearchInputDto){
        return this.calendarioLetivoService.calendarioLetivoFindAll
    }

}