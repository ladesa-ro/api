import { IUsuarioModel } from '../../IUsuarioModel';

export interface IUsuarioFindOneResultDto extends Pick<IUsuarioModel, 'id' | 'nome' | 'matriculaSiape' | 'email'> {}
