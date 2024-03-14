import { IAmbienteModel } from 'application/business/(spec)/ambientes';
import { IDisciplinaModel } from '../../../disciplina';
import { ITurmaModel } from '../../../turma';
import { IDiarioFindOneByIdInputDto } from '../diario-find-one/IDiarioFindOneByIdInputDto';
import { IDiarioInputDto } from './IDiarioInputDto';

export interface IDiarioUpdateDto extends IDiarioFindOneByIdInputDto, Partial<Omit<IDiarioInputDto, 'id'>> {
  id: string;

  //

  // Situação do diário. Ativo ou inativo.
  situacao?: string;

  // Ano do diário.
  ano?: number;

  // Etapa/período do diário.
  etapa?: string | null;

  // turma que o diario pertence
  turma?: ITurmaModel;

  // disciplina a qual o diario pertence
  disciplina?: IDisciplinaModel;

  // Ambiente Padrao do diario
  ambientePadrao?: IAmbienteModel | null;

  //
}
