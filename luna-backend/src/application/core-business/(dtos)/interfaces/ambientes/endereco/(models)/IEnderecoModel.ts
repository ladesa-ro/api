import { IDatedObject, IObjectUuid } from '../../../(core)';
import { ICidadeModel } from '../../base-cidade';

export interface IEnderecoModel extends IObjectUuid, IDatedObject {
  //

  cep: string;
  logradouro: string;

  numero: number;
  bairro: string;

  complemento: string | null;
  pontoReferencia: string | null;

  //

  cidade: ICidadeModel;

  //
}
