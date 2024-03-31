import * as Dto from '../../../(spec)';

export interface ICampusPossuiModalidadeModel extends Dto.IObjectUuid {
  //

  id: string;

  //

  campus: Dto.ICampusModel;
  modalidade: Dto.IModalidadeModel;

  //
}
