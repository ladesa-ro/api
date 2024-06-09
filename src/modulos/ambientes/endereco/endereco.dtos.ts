import { Endereco, EnderecoCreate, EnderecoFindOneResult, GetDeclarationValidator, GetSchema } from '@sisgea/spec';
import * as yup from 'yup';
import { CreateEntityDtoClass } from '../../../legacy/especificacao';
import { createValidationContract } from '../../../validacao';

// ======================================================
export const EnderecoDto = CreateEntityDtoClass(Endereco, 'output');
export const EnderecoCreateDto = CreateEntityDtoClass(() => EnderecoCreate(), 'input');
export const EnderecoFindOneResultDto = CreateEntityDtoClass(EnderecoFindOneResult, 'output');
// ======================================================

export const EnderecoCreateDtoValidationContract = createValidationContract(() => GetSchema(GetDeclarationValidator(EnderecoCreate()), yup) as yup.ObjectSchema<any>);
