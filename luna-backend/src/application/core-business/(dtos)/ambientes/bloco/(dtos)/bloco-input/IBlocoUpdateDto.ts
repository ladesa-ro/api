import { IBlocoFindOneByIdInputDto } from '../bloco-find-one';
import { IBlocoInputDto } from './IBlocoInputDto';

export interface IBlocoUpdateDto extends IBlocoFindOneByIdInputDto, Partial<Omit<IBlocoInputDto, 'campus'>> {
  //

  id: string;

  //

  nome?: string;
  codigo?: string;

  //

  // campus?: IObjectUuid;

  //
}
