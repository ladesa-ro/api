import { GetDeclarationValidator, GetSchema, Turma } from '@sisgea/spec';
import * as yup from 'yup';
import { CreateEntityDtoClass } from '../../../legacy/especificacao/utilitarios/CreateEntityDtoClass';
import { createValidationContract } from '../../../validacao';

// ======================================================
export const TurmaDto = CreateEntityDtoClass(Turma);
// ======================================================
export const TurmaDtoValidationContract = createValidationContract(() => GetSchema(GetDeclarationValidator(Turma()), yup));
// ======================================================
