import { IDiarioModel } from '../../IDiarioModel';

export interface IDiarioFindOneByIdInputDto extends Pick<IDiarioModel, 'id'> {
  id: string;
}
