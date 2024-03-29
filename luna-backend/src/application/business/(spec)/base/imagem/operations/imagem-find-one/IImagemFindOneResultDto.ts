import { IImagemArquivoFindOneResultDto } from '../../../imagem-arquivo/operations';
import { IImagemModel } from '../../IImagemModel';

export interface IImagemFindOneResultDto extends Pick<IImagemModel, 'id' | 'descricao'> {
  imagemArquivo: Omit<IImagemArquivoFindOneResultDto, 'imagem'>[];
}
