import { IUsuarioModel } from '../../IUsuarioModel';

export interface IUsuarioInputDto extends Pick<IUsuarioModel, 'id' | 'nome' | 'matriculaSiape' | 'email' | 'isSuperUser'> {}
