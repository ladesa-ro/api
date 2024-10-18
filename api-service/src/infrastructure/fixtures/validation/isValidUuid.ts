import { string } from "yup";

export const isValidUuid = (data: unknown) => {
  return string().uuid().isValidSync(data);
};
