import type { IAuthzStatement } from "@/business-logic/authorization";
import { ForbiddenException } from "@nestjs/common";

export function createForbiddenExceptionForAction<Statement extends IAuthzStatement, Action extends Statement["action"]>(action: Action) {
  return new ForbiddenException(`Insufficient permissions to perform '${action}'.`);
}
