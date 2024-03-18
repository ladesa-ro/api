
import { createDtoOperationOptions } from 'infrastructure';
import { CalendarioLetivoDto, CalendarioLetivoDtoValidationContract } from './calendario-letivo.dto';
import { CalendarioLetivoFindOneResultDto } from './calendario-letivo-find-one.operation';

export const CALENDARIO_LETIVO_CREATE = createDtoOperationOptions({
    description: 'Realiza o cadastro "calendario-letivo".',
    gql: {
        name: 'calendario_letivoCreate',
        inputDtoType: () => CalendarioLetivoDto,

        inputDtoValidationContract: CalendarioLetivoDtoValidationContract,

        returnType: () => CalendarioLetivoDto,
    },
    swagger: {
        inputBodyType: CalendarioLetivoDto,

        inputBodyValidationContract: CalendarioLetivoDtoValidationContract,

        returnType:CalendarioLetivoFindOneResultDto,
    }
}) 