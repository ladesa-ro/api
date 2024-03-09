import { IUsuarioModel } from '../../../application/business/(spec)';

export type ICurrentUsuario = null | Pick<IUsuarioModel, 'id' | 'nome' | 'matriculaSiape' | 'email' | 'isSuperUser'>;
