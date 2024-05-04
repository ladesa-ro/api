import { Usuario, UsuarioFindAllResult, UsuarioFindOneByIdInput, UsuarioFindOneResult } from '@sisgea/spec';
import { CreateEntityDtoClass } from '../../../especificacao';

// ======================================================
export const UsuarioDto = CreateEntityDtoClass(Usuario);
export const UsuarioFindAllResultDto = CreateEntityDtoClass(UsuarioFindAllResult);
export const UsuarioFindOneResultDto = CreateEntityDtoClass(UsuarioFindOneResult);
export const UsuarioFindOneByIdInputDto = CreateEntityDtoClass(UsuarioFindOneByIdInput, 'input');
// ======================================================
