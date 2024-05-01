import { Body } from '@nestjs/common';
import { ValidationPipeYup } from '../../infraestrutura/validation';
import { IDtoOperationOptions } from './DtoOperation';

export const HttpDtoBody = (options: IDtoOperationOptions) => {
  const { inputBodyType, inputBodyValidationContract } = options.swagger;

  if (!inputBodyType) {
    throw new TypeError('Provide options.swagger.inputBodyType');
  }

  if (!inputBodyValidationContract) {
    throw new TypeError('Provide options.swagger.inputBodyValidationContract');
  }

  const schema = inputBodyValidationContract();

  return Body(new ValidationPipeYup(schema, { scope: 'body', path: null }));
};
