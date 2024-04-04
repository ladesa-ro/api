import { IUsuarioVinculoCampusFindOneResultDto } from '../../../../autenticacao';
import { IDiarioFindOneResultDto } from '../../../diario/operations';
import { IDiarioProfessorModel } from '../../IDiarioProfessorModel';

export interface IDiarioProfessorFindOneResultDto extends Pick<IDiarioProfessorModel, 'id' | 'situacao'> {
  diario: IDiarioFindOneResultDto;
  vinculoProfessor: IUsuarioVinculoCampusFindOneResultDto;
}
