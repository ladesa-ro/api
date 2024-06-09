import { Diario, GetDeclarationValidator, GetSchema } from '@sisgea/spec';
import * as yup from 'yup';
import { CreateEntityDtoClass } from '../../../legacy/especificacao/utilitarios/CreateEntityDtoClass';
import { createValidationContract } from '../../../validacao';

// ======================================================
export const DiarioDto = CreateEntityDtoClass(Diario);
// ======================================================
export const DiarioDtoValidationContract = createValidationContract(() => GetSchema(GetDeclarationValidator(Diario()), yup));
// ======================================================
