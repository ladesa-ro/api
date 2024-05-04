import { AmbienteCreate } from '@sisgea/spec';
import { CreateEntityDtoClass } from '../../../especificacao';

// ======================================================
export const AmbienteDto = CreateEntityDtoClass(AmbienteCreate);
export const AmbienteCreateDto = CreateEntityDtoClass(AmbienteCreate, 'input');
// ======================================================
