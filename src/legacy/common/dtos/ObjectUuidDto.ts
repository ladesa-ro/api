import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from '../../utils';

export const ObjectUuidDto = createEntityDtoClass(Spec.ObjectUuidDeclarationFactory, 'input');
