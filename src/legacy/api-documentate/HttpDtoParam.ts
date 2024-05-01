import { Param } from '@nestjs/common';
import { ValidationPipeYup } from '../../validacao';
import { IDtoOperationOptions } from './DtoOperation';

export const HttpDtoParam = (options: IDtoOperationOptions, name: string) => {
  const param = options.swagger.params?.find((param) => param.name === name) ?? null;

  if (!param) {
    throw new TypeError('Param not found');
  }

  const schema = param.validationContract();

  return Param(
    name,
    new ValidationPipeYup(schema, {
      scope: 'param',
      path: name,
    }),
  );
};
