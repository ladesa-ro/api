import { ValidationContractObjectUuidBase, createDtoOperationOptions, createValidationContract } from 'infrastructure';
import * as yup from 'yup';
import { TurmaFindOneByIdInputValidationContract, TurmaFindOneResultDto } from './turma-find-one.operation';
import { TurmaInputDto, TurmaInputDtoValidationContract } from './turma-input.operation';
import { TurmaDto } from './turma.dto';

// ======================================================

export const TurmaCreateInputDtoValidationContract = createValidationContract(() => {
  const schema = TurmaInputDtoValidationContract();

  return (
    yup
      //
      .object()
      .concat(TurmaFindOneByIdInputValidationContract())
      .concat(schema.pick(['nome', 'periodo', 'grupo']))
      .shape({
        ambientePadraoAula: ValidationContractObjectUuidBase({ required: false, optional: false }),
        curso: ValidationContractObjectUuidBase({ required: true, optional: false }),
      })
  );
});

// ======================================================

export const TURMA_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de "turma".',

  gql: {
    name: 'turmaCreate',

    inputDtoType: () => TurmaInputDto,
    inputDtoValidationContract: TurmaCreateInputDtoValidationContract,

    returnType: () => TurmaDto,
  },

  swagger: {
    inputBodyType: TurmaInputDto,
    inputBodyValidationContract: TurmaCreateInputDtoValidationContract,

    returnType: TurmaFindOneResultDto,
  },
});
