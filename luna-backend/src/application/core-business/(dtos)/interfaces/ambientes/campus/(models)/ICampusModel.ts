import { IDatedObject, IObjectUuid } from '../../../(core)';
import { IEnderecoModel } from '../../endereco';

export interface ICampusModel extends IObjectUuid, IDatedObject {
  //

  razaoSocial: string;
  nomeFantasia: string;
  apelido: string;
  cnpj: string;

  //

  endereco: IEnderecoModel;
}
