import { IDiarioProfessorModel } from '../../IDiarioProfessorModel';

export interface IDiarioProfessorFindOneByIdInputDto extends Pick<IDiarioProfessorModel, 'id'> {
  id: string;
}
