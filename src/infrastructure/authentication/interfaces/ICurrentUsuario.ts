import { IUsuarioModel } from '@sisgea/spec';

export type ICurrentUsuario = null | Pick<IUsuarioModel, 'id' | 'nome' | 'matriculaSiape' | 'email' | 'isSuperUser'>;
