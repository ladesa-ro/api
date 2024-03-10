import { IModalidadeFindOneByIdInputDto } from '../{{ c_kebab moduleName }}-find-one/IModalidadeFindOneByIdInputDto';
import { IModalidadeInputDto } from './IModalidadeInputDto';

export interface IModalidadeUpdateDto extends IModalidadeFindOneByIdInputDto, Partial<Omit<IModalidadeInputDto, 'campus'>> {
  //

  id: string;

  //

  nome?: string;
  slug?: string;

  //

  // campus?: IObjectUuid;

  //
}
