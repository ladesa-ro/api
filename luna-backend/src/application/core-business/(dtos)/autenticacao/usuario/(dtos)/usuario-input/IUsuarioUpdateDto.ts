import { IUsuarioFindOneByIdInputDto } from '../usuario-find-one';
import { IUsuarioInputDto } from './IUsuarioInputDto';

export interface IUsuarioUpdateDto extends IUsuarioFindOneByIdInputDto, Partial<Omit<IUsuarioInputDto, never>> {
  //

  id: string;

  //
}
