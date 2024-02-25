import { IUsuarioFindOneByIdInputDto } from '../usuario-find-one';

export interface IUsuarioDeleteOneByIdInputDto extends IUsuarioFindOneByIdInputDto {
  id: string;
}
