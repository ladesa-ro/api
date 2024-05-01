import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { createValidationContract } from '../../../../validacao';

// ======================================================

export const CursoDtoValidationContract = createValidationContract(() => Spec.GetSchema(Spec.CursoValidator, yup));

// ======================================================
export const CursoDto = createEntityDtoClass(Spec.CursoDeclarationFactory);
// ======================================================
