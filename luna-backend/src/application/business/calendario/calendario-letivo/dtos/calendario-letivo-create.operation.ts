
import { createDtoOperationOptions } from 'infrastructure';
import { CalendarioLetivoFindOneResultDto } from './calendario-letivo-find-one.operation';
import { CalendarioLetivoCreateInputDtoValidationContract, CalendarioLetivoDto } from './calendario-letivo.dto';

export const CALENDARIO_LETIVO_CREATE = createDtoOperationOptions({
    description: 'Realiza o cadastro de um calendário letivo.',

    gql: {
        name: 'calendarioLetivoCreate',

        inputDtoType: () => CalendarioLetivoDto,
        inputDtoValidationContract: CalendarioLetivoCreateInputDtoValidationContract,

        returnType: () => CalendarioLetivoDto,
    },
    swagger: {
        inputBodyType: CalendarioLetivoDto,
        inputBodyValidationContract: CalendarioLetivoCreateInputDtoValidationContract,

        returnType: CalendarioLetivoFindOneResultDto,
    }
}) 
