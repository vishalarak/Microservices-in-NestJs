import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Id = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request?.id ? request?.id : request;
  },
);
