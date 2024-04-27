import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { createValidationContract } from '../../../../../infrastructure';

// ======================================================

export const CursoDtoValidationContract = createValidationContract(() => {
  return new Spec.CursoValidationContract().yupSchema(Spec.extendYup(yup));
});

// ======================================================
export const CursoDto = createEntityDtoClass(Spec.CursoDeclarationFactory);
// ======================================================
