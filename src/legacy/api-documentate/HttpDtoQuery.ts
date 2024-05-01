import { Query } from '@nestjs/common';
import { ValidationPipeYup } from '../../validacao';
import { IDtoOperationOptions } from './DtoOperation';

export const HttpDtoQuery = (options: IDtoOperationOptions, name: string) => {
  const param =
    options.swagger.queries?.find((query) => {
      if (typeof query === 'string') {
        return query;
      }

      return query.name === name;
    }) ?? null;

  if (!param) {
    throw new TypeError('Param not found');
  }

  if (typeof param === 'string') {
    return Query(name);
  } else {
    const schema = param.validationContract();

    return Query(
      name,
      new ValidationPipeYup(schema, {
        scope: 'query',
        path: name,
      }),
    );
  }
};
