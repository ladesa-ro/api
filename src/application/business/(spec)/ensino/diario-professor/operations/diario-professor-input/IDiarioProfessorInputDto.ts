import { IObjectUuid } from '../../../../(core)';
import { IDiarioProfessorModel } from '../../IDiarioProfessorModel';

export interface IDiarioProfessorInputDto extends Pick<IDiarioProfessorModel, 'situacao'> {
  diario: IObjectUuid;
  vinculoProfessor: IObjectUuid;
}
