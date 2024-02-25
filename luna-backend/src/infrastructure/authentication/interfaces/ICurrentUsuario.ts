import { IUsuarioModel } from '../../../application/core-business/(dtos)';

export type ICurrentUsuario = null | Pick<IUsuarioModel, 'id' | 'nome' | 'matriculaSiape' | 'email' | 'isSuperUser'>;
