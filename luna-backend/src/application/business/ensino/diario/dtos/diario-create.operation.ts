import { ValidationContractObjectUuidBase, createDtoOperationOptions, createValidationContract } from 'infrastructure';
import * as yup from 'yup';
import { DiarioFindOneResultDto } from './diario-find-one.operation';
import { DiarioInputDto, DiarioInputDtoValidationContract } from './diario-input.operation';
import { DiarioDto } from './diario.dto';

// ======================================================

export const DiarioCreateInputDtoValidationContract = createValidationContract(() => {
  const schema = DiarioInputDtoValidationContract();

  return (
    yup
      //
      .object()
      .concat(schema.pick(['situacao', 'ano', 'etapa']))
      .shape({
        turma: ValidationContractObjectUuidBase({ required: true, optional: false }),
        disciplina: ValidationContractObjectUuidBase({ required: true, optional: false }),
        ambientePadrao: ValidationContractObjectUuidBase({ required: false, optional: false }),
      })
  );
});

// ======================================================

export const DIARIO_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de "diario".',

  gql: {
    name: 'diarioCreate',

    inputDtoType: () => DiarioInputDto,
    inputDtoValidationContract: DiarioCreateInputDtoValidationContract,

    returnType: () => DiarioDto,
  },

  swagger: {
    inputBodyType: DiarioInputDto,
    inputBodyValidationContract: DiarioCreateInputDtoValidationContract,

    returnType: DiarioFindOneResultDto,
  },
});
