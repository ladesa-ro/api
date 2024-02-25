import { IAmbienteFindOneByIdInputDto } from '../ambiente-find-one';
import { IAmbienteInputDto } from './IAmbienteInputDto';

export interface IAmbienteUpdateDto extends IAmbienteFindOneByIdInputDto, Partial<Omit<IAmbienteInputDto, 'bloco'>> {
  //

  id: string;

  //

  // bloco?: IObjectUuid;

  //
}
