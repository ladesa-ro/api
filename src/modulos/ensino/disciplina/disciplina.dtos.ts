import { Disciplina, GetDeclarationValidator, GetSchema } from '@sisgea/spec';
import * as yup from 'yup';
import { CreateEntityDtoClass } from '../../../legacy/especificacao/utilitarios/CreateEntityDtoClass';
import { createValidationContract } from '../../../validacao';

// ======================================================
export const DisciplinaDto = CreateEntityDtoClass(Disciplina);
// ======================================================
export const DisciplinaDtoValidationContract = createValidationContract(() => GetSchema(GetDeclarationValidator(Disciplina()), yup));
// ======================================================
