import { IUsuarioFindOneResultDto } from '../../usuario';

export type IAutenticacaoQuemSouEuResultDto = {
  usuario: IUsuarioFindOneResultDto | null;
};
