import { CheckTypeFile, CheckTypeObject, CheckView } from "@unispec/ast-builder";
import type { IUniNode, IUniNodeOperation } from "@unispec/ast-types";
import type { UniRepository } from "@unispec/ast-utils";
import { CompileClassDto } from "@unispec/driver-nestjs";
import { CompileClassHandlerGraphQlDto, CompileNodeGraphQlRepresentation } from "@unispec/driver-nestjs-graphql";
import { CompileClassHandlerSwaggerDto, CompileNodeSwaggerRepresentation } from "@unispec/driver-nestjs-swagger";
import { getLadesaNodesRepository } from "../../../providers";

const dtoClassesMap = new Map<string, object>();

const SetupCompilers = () => {
  const repository = getLadesaNodesRepository();

  const classCompiler = new CompileClassDto(repository, [new CompileClassHandlerGraphQlDto(), new CompileClassHandlerSwaggerDto()], dtoClassesMap);

  const graphQlRepresentationCompiler = new CompileNodeGraphQlRepresentation(repository, classCompiler);
  const swaggerRepresentationCompiler = new CompileNodeSwaggerRepresentation(repository, classCompiler);

  return {
    repository,
    classCompiler,
    graphQlRepresentationCompiler,
    swaggerRepresentationCompiler,
  };
};

export const { repository, classCompiler, graphQlRepresentationCompiler, swaggerRepresentationCompiler } = SetupCompilers();

const ResolveGraphQlTargetView = (repository: UniRepository, cursor: IUniNode | string) => {
  let targetNode: IUniNode | string | null = repository.GetRealTarget(cursor);

  if (CheckView(targetNode) && CheckTypeObject(targetNode.type)) {
    const fullReferenced = targetNode.type.partialOf ? repository.GetRealTarget(targetNode.type.partialOf) : null;

    if (fullReferenced && CheckView(fullReferenced)) {
      targetNode = fullReferenced;
    }
  }

  if (targetNode) {
    return targetNode;
  } else {
    throw new TypeError("Cannot resolve graphql target view.");
  }
};

export const BuildGraphQlRepresentation = (targetCursor: string | IUniNode, meta?: Record<string, any> | undefined) => {
  const target = ResolveGraphQlTargetView(graphQlRepresentationCompiler.repository, targetCursor);

  if (target) {
    return graphQlRepresentationCompiler.Handle(target, meta);
  } else {
    throw new TypeError();
  }
};

export const detectStrategy = (node: any) => {
  if (node && CheckTypeFile(node)) {
    return "file";
  }

  return "dto";
};

export type DecorateMethodContext = {
  readonly repository: UniRepository;
  readonly operation: IUniNodeOperation;

  decorators: Array<MethodDecorator>;
  combinedInputParameterDecorators: Array<ParameterDecorator>;

  Add(decorator: MethodDecorator): DecorateMethodContext;
  CombinedInputAdd(decorator: ParameterDecorator): DecorateMethodContext;
};

export abstract class AbstractOperationDecoratorsHandler {
  abstract Build(context: DecorateMethodContext): void;
}
