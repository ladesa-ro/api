import { AmbienteCreate } from '@sisgea/spec';
import { CreateEntityDtoClass } from '../../../legacy/especificacao';

// ======================================================
export const AmbienteDto = CreateEntityDtoClass(AmbienteCreate);
export const AmbienteCreateDto = CreateEntityDtoClass(AmbienteCreate, 'input');
// ======================================================
