import { Estado, EstadoFindAllResult, EstadoFindOneByIdInput, EstadoFindOneByUfInput, EstadoFindOneResult } from '@sisgea/spec';
import { CreateEntityDtoClass } from '../../../legacy/especificacao';

// ======================================================
export const EstadoDto = CreateEntityDtoClass(Estado);
export const EstadoFindAllResultDto = CreateEntityDtoClass(EstadoFindAllResult);
export const EstadoFindOneResultDto = CreateEntityDtoClass(EstadoFindOneResult);
export const EstadoFindOneByIdInputDto = CreateEntityDtoClass(EstadoFindOneByIdInput, 'input');
export const EstadoFindOneByUfInputDto = CreateEntityDtoClass(EstadoFindOneByUfInput, 'input');
// ======================================================
