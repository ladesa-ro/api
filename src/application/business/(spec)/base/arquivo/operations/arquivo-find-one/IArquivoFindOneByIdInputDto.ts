import { IArquivoModel } from '../../IArquivoModel';

export interface IArquivoFindOneByIdInputDto extends Pick<IArquivoModel, 'id'> {
  id: string;
}
