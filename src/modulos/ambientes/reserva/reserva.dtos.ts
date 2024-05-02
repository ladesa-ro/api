import { Reserva, ReservaFindAllResult, ReservaFindOneByIdInput, ReservaFindOneResult } from '@sisgea/spec';
import { CreateEntityDtoClass } from '../../../especificacao';

// ======================================================
export const ReservaDto = CreateEntityDtoClass(Reserva);
export const ReservaFindAllResultDto = CreateEntityDtoClass(ReservaFindAllResult);
export const ReservaFindOneResultDto = CreateEntityDtoClass(ReservaFindOneResult);
export const ReservaFindOneByIdInputDto = CreateEntityDtoClass(ReservaFindOneByIdInput, 'input');
// ======================================================
