import * as yup from 'yup';
import { ValidationContractObjectUuidBase, createDtoOperationOptions, createValidationContract } from '../../../../infraestrutura';
import { CalendarioLetivoFindOneByIdInputValidationContract, CalendarioLetivoFindOneResultDto } from './calendario-letivo-find-one.operation';
import { CalendarioLetivoInputDto, CalendarioLetivoInputDtoValidationContract } from './calendario-letivo-input.operation';
import { CalendarioLetivoDto } from './calendario-letivo.dto';

export const CalendarioLetivoCreateInputDtoValidationContract = createValidationContract(() => {
  const schema = CalendarioLetivoInputDtoValidationContract();

  return (
    yup
      //
      .object()
      .concat(CalendarioLetivoFindOneByIdInputValidationContract())
      .concat(schema.pick(['nome', 'ano']))
      .shape({
        campus: ValidationContractObjectUuidBase({ required: true, optional: false }),
        modalidade: ValidationContractObjectUuidBase({ required: true, optional: false }),
      })
  );
});

export const CALENDARIO_LETIVO_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de um calendário letivo.',

  gql: {
    name: 'calendarioLetivoCreate',

    inputDtoType: () => CalendarioLetivoInputDto,
    inputDtoValidationContract: CalendarioLetivoCreateInputDtoValidationContract,

    returnType: () => CalendarioLetivoDto,
  },
  swagger: {
    inputBodyType: CalendarioLetivoInputDto,
    inputBodyValidationContract: CalendarioLetivoCreateInputDtoValidationContract,

    returnType: CalendarioLetivoFindOneResultDto,
  },
});
