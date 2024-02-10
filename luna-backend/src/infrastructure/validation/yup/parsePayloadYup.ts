import { ObjectSchema, ValidateOptions } from 'yup';

export const parsePayloadYup = async <
  Schema extends ObjectSchema<any, any, any>,
  Output extends Schema['__outputType'],
>(
  schema: Schema,
  raw: any,
): Promise<Output> => {
  const validateOptions: ValidateOptions = { strict: false };

  const isValid = await schema.isValid(raw, validateOptions);

  if (isValid) {
    const dto = await schema.validate(raw, validateOptions);
    return dto;
  } else {
    const err = await schema.validate(raw, validateOptions).catch((err) => err);

    console.debug('[error] parsePayloadYup', { err, raw, schema });

    throw new TypeError('Invalid input data.');
  }
};
