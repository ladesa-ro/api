import { IUsuarioModel } from '../../../application/business/(dtos)';

export type ICurrentUsuario = null | Pick<IUsuarioModel, 'id' | 'nome' | 'matriculaSiape' | 'email' | 'isSuperUser'>;
