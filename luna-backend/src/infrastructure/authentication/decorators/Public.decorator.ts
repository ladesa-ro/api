import { SetMetadata, applyDecorators } from '@nestjs/common';
import { NEEDS_AUTH_KEY } from './NeedsAuth.decorator';

export const Public = () => {
  return applyDecorators(SetMetadata(NEEDS_AUTH_KEY, false));
};
