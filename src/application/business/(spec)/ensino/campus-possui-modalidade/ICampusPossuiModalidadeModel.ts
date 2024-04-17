import * as Dto from '../..';

export interface ICampusPossuiModalidadeModel extends Dto.IObjectUuid {
  //

  id: string;

  //

  campus: Dto.ICampusModel;
  modalidade: Dto.IModalidadeModel;

  //
}
