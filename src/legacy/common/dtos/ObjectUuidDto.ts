import * as Spec from '@sisgea/spec';
import { CreateEntityDtoClass } from '../../utils';

export const ObjectUuidDto = CreateEntityDtoClass(Spec.ObjectUuidDeclarationFactory, 'input');
