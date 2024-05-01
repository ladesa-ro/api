import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const UsuarioDaRequisicaoHttp = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = context.switchToHttp();
  const request = ctx.getRequest<Request>();
  return (request as any).user ?? null;
});
