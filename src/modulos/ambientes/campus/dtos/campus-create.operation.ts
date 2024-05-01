import * as Spec from '@sisgea/spec';
import { createDtoOperationOptions } from '../../../../legacy';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { CampusFindOneResultDto } from './campus-find-one.operation';
import { CampusInputDtoValidationContract } from './campus-input.dto';
import { CampusDto } from './campus.dto';

export const CampusCreateDto = createEntityDtoClass(Spec.CampusCreateDeclaration, 'input');

export const CAMPUS_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de um campus.',

  gql: {
    name: 'campusCreate',

    inputDtoType: () => CampusCreateDto,
    inputDtoValidationContract: CampusInputDtoValidationContract,

    returnType: () => CampusDto,
  },

  swagger: {
    inputBodyType: CampusCreateDto,
    inputBodyValidationContract: CampusInputDtoValidationContract,

    returnType: CampusFindOneResultDto,
  },
});
