import { ISpecDecorateHandler, ISpecDecorateOperationContext } from "@/business-logic/standards/especificacao/business-logic/Decorators/Operation/Core/ISpecDecorateHandler";
import { dtoCompiler } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/DtoCompiler";
import { Param as HttpParam, Query as HttpQuery, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiQuery, ApiResponse } from "@nestjs/swagger";

export class SwaggerSpecDecorateHandler implements ISpecDecorateHandler {
  HandleOperation(context: ISpecDecorateOperationContext): void {
    this.HandleOperationMetadata(context);
    this.HandleInputs(context);
    this.HandleResponses(context);
  }

  private HandleOperationMetadata(context: ISpecDecorateOperationContext) {
    context.AddMethodDecorator(
      ApiOperation({
        description: context.meta.description,
        operationId: context.meta.operationId,
      }),
    );

    context.AddMethodDecorator(ApiBearerAuth());
  }

  private HandleInputs(context: ISpecDecorateOperationContext): void {
    this.HandleInputBody(context);
    this.HandleInputParams(context);
    this.HandleInputQueries(context);
  }

  private HandleInputParams(context: ISpecDecorateOperationContext): void {
    const node = context.meta.node;

    const input = node.properties.input;
    if (!input) return;

    const inputParams = input?.properties?.params;
    if (!inputParams) return;

    const extractProperties = function* () {
      for (const [key, schema] of Object.entries(inputParams.properties ?? {})) {
        const required = inputParams.required?.includes(key) ?? false;

        yield {
          key,
          schema,
          required,
        };
      }
    };

    for (const { key, schema, required } of extractProperties()) {
      const name = key;

      const dtoCompilerContext = dtoCompiler.GetContext("input");

      const swaggerTypings: any = dtoCompiler.swaggerNodeCompiler.Handle(schema, dtoCompilerContext);

      context.AddMethodDecorator(
        ApiParam({
          ...swaggerTypings,
          name: name,
          required: required,
        }),
      );

      context.AddCombinedInputDecorator(HttpParam(name));
    }
  }

  private HandleInputQueries(context: ISpecDecorateOperationContext): void {
    const node = context.meta.node;

    const input = node.properties.input;
    if (!input) return;

    const inputQueries = input?.properties?.queries;
    if (!inputQueries) return;

    const extractProperties = function* () {
      for (const [key, schema] of Object.entries(inputQueries.properties ?? {})) {
        const required = inputQueries.required?.includes(key) ?? false;

        yield {
          key,
          schema,
          required,
        };
      }
    };

    for (const { key, schema, required } of extractProperties()) {
      const name = key;

      const dtoCompilerContext = dtoCompiler.GetContext("input");

      const swaggerTypings: any = dtoCompiler.swaggerNodeCompiler.Handle(schema, dtoCompilerContext);

      context.AddMethodDecorator(
        ApiQuery({
          ...swaggerTypings,
          name: name,
          required: required,
        }),
      );

      context.AddCombinedInputDecorator(HttpQuery(name));
    }
  }

  private HandleInputBody(context: ISpecDecorateOperationContext): void {
    const node = context.meta.node;

    const input = node.properties.input;
    if (!input) return;

    const inputBody = input?.properties?.body;
    if (!inputBody) return;

    const inputBodyRequired = input.required?.includes("body");

    const dtoCompilerContext = dtoCompiler.GetContext("input");

    const swaggerTypings: any = dtoCompiler.swaggerNodeCompiler.Handle(inputBody, dtoCompilerContext);

    if (swaggerTypings.type === "string" && swaggerTypings.format === "binary") {
      context.AddMethodDecorator(ApiConsumes("multipart/form-data"));

      context.AddMethodDecorator(
        ApiBody({
          schema: {
            type: "object",
            required: inputBodyRequired ? ["file"] : [],
            properties: {
              file: { ...swaggerTypings },
            },
          },
        }),
      );

      context.AddMethodDecorator(UseInterceptors(FileInterceptor("file")));
    } else {
      context.AddMethodDecorator(
        ApiBody({
          ...swaggerTypings,
        }),
      );
    }
  }

  private HandleResponses(context: ISpecDecorateOperationContext): void {
    this.HandleResponseOutputs(context);
    this.HandleResponseForbidden(context);
    this.HandleResponseNotFound(context);
  }

  private HandleResponseOutputs(context: ISpecDecorateOperationContext): void {
    const node = context.meta.node;

    const output = node.properties.output;

    const outputsEntries = function* () {
      if (output) {
        const success = output.properties?.success;

        if (success) {
          const required = output.required?.includes("success");
          yield { status: 200, outputs: success, required };
        }
      }
    };

    for (const outputEntry of outputsEntries()) {
      const { status, outputs } = outputEntry;

      const dtoCompilerContext = dtoCompiler.GetContext("output");

      const swaggerTypings: any = dtoCompiler.swaggerNodeCompiler.Handle(outputs, dtoCompilerContext);

      if (swaggerTypings.type === "string" && swaggerTypings.format === "binary") {
        context.AddMethodDecorator(ApiProduces(...swaggerTypings.mimeTypes));

        context.AddMethodDecorator(
          ApiResponse({
            status,

            schema: {
              ...swaggerTypings,
            },
          }),
        );
      } else {
        context.AddMethodDecorator(
          ApiResponse({
            status,
            ...swaggerTypings,
          }),
        );
      }
    }
  }

  private HandleResponseForbidden(context: ISpecDecorateOperationContext) {
    context.AddMethodDecorator(
      ApiResponse({
        status: 403,
        description: "O solicitante não tem permissão para executar esta ação.",
      }),
    );
  }

  private HandleResponseNotFound(context: ISpecDecorateOperationContext) {
    context.AddMethodDecorator(
      ApiResponse({
        status: 404,
        description: "Registro não encontrado.",
      }),
    );
  }
}
