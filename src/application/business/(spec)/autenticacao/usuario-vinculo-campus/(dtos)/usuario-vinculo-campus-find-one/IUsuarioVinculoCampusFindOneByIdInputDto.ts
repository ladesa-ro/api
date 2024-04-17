import { IUsuarioVinculoCampusModel } from '../../IUsuarioVinculoCampusModel';

export interface IUsuarioVinculoCampusFindOneByIdInputDto extends Pick<IUsuarioVinculoCampusModel, 'id'> {
  id: string;
}
