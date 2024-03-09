import { IAmbienteModel } from '../../IAmbienteModel';

export interface IAmbienteFindOneByIdInputDto extends Pick<IAmbienteModel, 'id'> {
  id: string;
}
