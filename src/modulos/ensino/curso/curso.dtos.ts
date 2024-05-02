import { Curso, GetDeclarationValidator, GetSchema } from '@sisgea/spec';
import * as yup from 'yup';
import { CreateEntityDtoClass } from '../../../especificacao/utilitarios/CreateEntityDtoClass';
import { createValidationContract } from '../../../validacao';

// ======================================================
export const CursoDto = CreateEntityDtoClass(Curso);
// ======================================================
export const CursoDtoValidationContract = createValidationContract(() => GetSchema(GetDeclarationValidator(Curso()), yup));
// ======================================================
