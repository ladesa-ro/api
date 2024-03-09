import { IUsuarioModel } from '../../IUsuarioModel';

export interface IUsuarioFindOneByIdInputDto extends Pick<IUsuarioModel, 'id'> {
  id: string;
}
