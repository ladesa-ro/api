import * as Spec from '@sisgea/spec';
import { CreateEntityDtoClass } from '../../../legacy/utils';

// ======================================================
export const ImagemDto = CreateEntityDtoClass(Spec.Imagem);
export const ImagemFindOneResultDto = CreateEntityDtoClass(Spec.ImagemFindOneResult, 'output');
// ======================================================
