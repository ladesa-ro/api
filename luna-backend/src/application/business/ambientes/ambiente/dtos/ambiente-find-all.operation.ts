import { createDtoOperationOptions } from '../../../../../infrastructure';
import { AmbienteFindOneResultDto } from './ambiente-find-one.operation';
import { AmbienteDto } from './ambiente.dto';

// ======================================================

export const AMBIENTE_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de todos os ambientes cadastrados no sistema.',

  gql: {
    name: 'ambienteFindAll',
    returnType: () => [AmbienteDto],
  },

  swagger: {
    returnType: [AmbienteFindOneResultDto],
  },
});

// ======================================================
