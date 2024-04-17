import { IArquivoModel } from '../../IArquivoModel';

export interface IArquivoFindOneResultDto extends Pick<IArquivoModel, 'id' | 'nome' | 'mimeType' | 'sizeBytes' | 'storageType'> {}
