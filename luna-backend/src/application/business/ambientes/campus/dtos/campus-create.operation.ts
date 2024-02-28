import { createDtoOperationOptions } from '../../../../../infrastructure';
import { CampusFindOneResultDto } from './campus-find-one.operation';
import { CampusInputDto, CampusInputDtoValidationContract } from './campus-input.dto';
import { CampusDto } from './campus.dto';

export const CAMPUS_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de um campus.',

  gql: {
    name: 'campusCreate',

    inputDtoType: () => CampusInputDto,
    inputDtoValidationContract: CampusInputDtoValidationContract,

    returnType: () => CampusDto,
  },

  swagger: {
    inputBodyType: CampusInputDto,
    inputBodyValidationContract: CampusInputDtoValidationContract,

    returnType: CampusFindOneResultDto,
  },
});
