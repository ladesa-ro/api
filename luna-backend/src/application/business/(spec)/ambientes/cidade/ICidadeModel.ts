import { IEstadoModel } from './../estado/IEstadoModel';
export interface ICidadeModel {
  id: number;

  //
  nome: string;
  //

  estado: IEstadoModel;
}
