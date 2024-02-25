import { IUsuarioModel } from '../../IUsuarioModel';

export interface IUsuarioInputDto extends Pick<IUsuarioModel, 'nome' | 'matriculaSiape' | 'email'> {}
