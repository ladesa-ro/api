import { IDiarioProfessorFindOneByIdInputDto } from '../diario-professor-find-one';

export interface IDiarioProfessorDeleteOneByIdInputDto extends IDiarioProfessorFindOneByIdInputDto {
  id: string;
}
