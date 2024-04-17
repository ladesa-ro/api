import { IObjectUuid } from '../../../../(core)';
import { IDiarioProfessorFindOneByIdInputDto } from '../diario-professor-find-one/IDiarioProfessorFindOneByIdInputDto';
import { IDiarioProfessorInputDto } from './IDiarioProfessorInputDto';

export interface IDiarioProfessorUpdateDto extends IDiarioProfessorFindOneByIdInputDto, Partial<Omit<IDiarioProfessorInputDto, 'id'>> {
  id: string;

  //

  // Situação do vínculo.
  situacao?: boolean;

  // Diário do vínculo.
  diario?: IObjectUuid;

  // Vínculo de usuário-professor.
  vinculoProfessor?: IObjectUuid;

  //
}
