
import { createDtoOperationOptions } from 'infrastructure';
import { CalendarioLetivoFindOneResultDto } from './calendario-letivo-find-one.operation';
import { CalendarioLetivoCreateInputDtoValidationContract, CalendarioLetivoDto } from './calendario-letivo.dto';

export const CALENDARIO_LETIVO_CREATE = createDtoOperationOptions({
    description: 'Realiza o cadastro "calendario-letivo".',
    gql: {
        name: 'calendario_letivoCreate',
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