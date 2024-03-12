import { ICampusModel } from 'application/business/(spec)/ambientes';
import { ICursoFindOneByIdInputDto } from '../curso-find-one/ICursoFindOneByIdInputDto';
import { ICursoInputDto } from './ICursoInputDto';
import { IModalidadeModel } from '../../../modalidade';

export interface ICursoUpdateDto extends ICursoFindOneByIdInputDto, Partial<Omit<ICursoInputDto, 'id'>> {
  id: string;

  //

  // Nome do Curso
  nome?: string;

  // Nome abreviado do curso
  nomeAbreviado?: string;

  // Campus que o Curso pertence
  campus?: ICampusModel;

  // Modalidade a que o Curso Pertence
  modalidade?: IModalidadeModel;

  //
}
