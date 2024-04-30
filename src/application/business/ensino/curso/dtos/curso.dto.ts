import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createValidationContract } from '../../../../../infrastructure';
import { createEntityDtoClass } from '../../../../../infrastructure/utils/createDtoClass';

// ======================================================

export const CursoDtoValidationContract = createValidationContract(() => Spec.GetSchema(Spec.CursoValidator, yup));

// ======================================================
export const CursoDto = createEntityDtoClass(Spec.CursoDeclarationFactory);
// ======================================================
