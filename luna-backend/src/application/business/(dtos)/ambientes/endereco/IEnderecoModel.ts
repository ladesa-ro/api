import { IDatedObject, IEntityDate, IObjectUuid } from '../../(core)';
import { ICidadeModel } from '../cidade';

export interface IEnderecoModel extends IObjectUuid, IDatedObject {
  //

  id: string;

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

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;

  //
}
