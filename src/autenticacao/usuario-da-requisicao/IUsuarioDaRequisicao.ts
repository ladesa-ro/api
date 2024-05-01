import { IUsuarioModel } from '@sisgea/spec';

export type IUsuarioDaRequisicao = null | Pick<IUsuarioModel, 'id' | 'nome' | 'matriculaSiape' | 'email' | 'isSuperUser'>;
