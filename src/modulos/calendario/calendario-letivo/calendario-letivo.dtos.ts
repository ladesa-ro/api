import { CalendarioLetivo, GetDeclarationValidator, GetSchema } from '@sisgea/spec';
import * as yup from 'yup';
import { CreateEntityDtoClass } from '../../../legacy/especificacao/utilitarios/CreateEntityDtoClass';
import { createValidationContract } from '../../../validacao';

// ======================================================
export const CalendarioLetivoDto = CreateEntityDtoClass(CalendarioLetivo);
// ======================================================
export const CalendarioLetivoDtoValidationContract = createValidationContract(() => GetSchema(GetDeclarationValidator(CalendarioLetivo()), yup));
// ======================================================
