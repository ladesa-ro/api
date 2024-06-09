import { DiarioProfessor, GetDeclarationValidator, GetSchema } from '@sisgea/spec';
import * as yup from 'yup';
import { CreateEntityDtoClass } from '../../../legacy/especificacao/utilitarios/CreateEntityDtoClass';
import { createValidationContract } from '../../../validacao';

// ======================================================
export const DiarioProfessorDto = CreateEntityDtoClass(DiarioProfessor);
// ======================================================
export const DiarioProfessorDtoValidationContract = createValidationContract(() => GetSchema(GetDeclarationValidator(DiarioProfessor()), yup));
// ======================================================
