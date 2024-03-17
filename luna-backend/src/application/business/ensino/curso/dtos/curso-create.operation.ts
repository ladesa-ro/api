import { ValidationContractObjectUuidBase, createDtoOperationOptions, createValidationContract } from 'infrastructure';
import * as yup from 'yup';
import { CursoFindOneByIdInputValidationContract, CursoFindOneResultDto } from './curso-find-one.operation';
import { CursoInputDto, CursoInputDtoValidationContract } from './curso-input.operation';
import { CursoDto } from './curso.dto';

// ======================================================

export const CursoCreateInputDtoValidationContract = createValidationContract(() => {
  const schema = CursoInputDtoValidationContract().partial();

  return (
    yup
      //
      .object()
      .concat(CursoFindOneByIdInputValidationContract())
      .concat(schema.pick(['nome', 'nomeAbreviado']))
      .shape({
        campus: ValidationContractObjectUuidBase({ required: true, optional: false }).defined(),
        modalidade: ValidationContractObjectUuidBase({ required: true, optional: false }).defined(),
      })
  );
});

// ======================================================

export const CURSO_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de "curso".',

  gql: {
    name: 'cursoCreate',

    inputDtoType: () => CursoInputDto,
    inputDtoValidationContract: CursoCreateInputDtoValidationContract,

    returnType: () => CursoDto,
  },

  swagger: {
    inputBodyType: CursoInputDto,
    inputBodyValidationContract: CursoCreateInputDtoValidationContract,

    returnType: CursoFindOneResultDto,
  },
});
