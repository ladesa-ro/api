import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';

// ======================================================

export const ImagemFindOneResultDto = createEntityDtoClass(Spec.ImagemFindOneResultDeclarationFactory, 'output');

// ======================================================
