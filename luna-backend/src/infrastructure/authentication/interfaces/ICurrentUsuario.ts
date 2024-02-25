import { IUsuarioModel } from '../../../application/core-business/(dtos)';

export type ICurrentUsuario = null | Pick<IUsuarioModel, 'nome' | 'matriculaSiape' | 'email' | 'isSuperUser'>;
