import { GenericClassCompilerFromUnispecEntity } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Core/GenericClassCompilerFromUnispecEntity";
import { GraphQlClassCompilerFromUnispecEntityHandler } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Integrations/GraphQl/GraphQlClassCompilerFromUnispecEntityHandler";
import { SwaggerClassCompilerFromUnispecEntityHandler } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Integrations/Swagger/SwaggerClassCompilerFromUnispecEntityHandler";
import { IDtoCompilerContext } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/typings";
import { getSpecNodesStore } from "@/business-logic/standards/especificacao/business-logic/SpecNodesStore";
import { CheckType, INode, INodeTypeObjectEntity, NodeTypeObjectEntity } from "@/business-logic/standards/especificacao/infrastructure";
import defu from "defu";
import * as valibot from "valibot";

const CursorContractNode = valibot.union([
  NodeTypeObjectEntity,

  valibot.object({
    $ref: valibot.optional(valibot.string()),
    anyOf: valibot.optional(valibot.union([valibot.tuple([]), valibot.never()])),
  }),
]);

const CursorContract = valibot.union([valibot.string(), CursorContractNode]);

export interface IDtoCompiler extends GenericClassCompilerFromUnispecEntity {
  GetContext(mode: IDtoCompilerContext["mode"]): IDtoCompilerContext;
  CompileClass(node: INode, classesMap?: Map<string, any>): any;
  CompileNode(cursor: string | INode, classesMap?: Map<string, any>): any;
}

export class DtoCompiler extends GenericClassCompilerFromUnispecEntity implements IDtoCompiler {
  #store = getSpecNodesStore();

  swaggerClassCompiler = new SwaggerClassCompilerFromUnispecEntityHandler();

  get swaggerNodeCompiler() {
    return this.swaggerClassCompiler.swaggerNodeCompiler;
  }

  constructor() {
    super();

    this.AddHandler(this.swaggerClassCompiler);
    this.AddHandler(new GraphQlClassCompilerFromUnispecEntityHandler());
  }

  GetContext(mode: IDtoCompilerContext["mode"]): IDtoCompilerContext {
    return {
      mode,
      dtoCompiler: this,
      nodesStore: this.#store,
    };
  }

  private ResolveCursor(cursor: string | INode): INodeTypeObjectEntity {
    const nodesStore = this.#store;

    const nestedNodes: INode[] = [];

    let nextCursor: INode | string = cursor;

    do {
      let targetId: string | null = null;

      if (!CheckType(CursorContract, nextCursor)) {
        const safeParseResult = valibot.safeParse(CursorContract, nextCursor);
        console.debug(safeParseResult);

        console.debug(`${DtoCompiler.name}#${this.ResolveCursor.name}: invalid cursor`);
        debugger;

        throw new TypeError("invalid cursor");
      }

      if (typeof nextCursor === "string") {
        targetId = nextCursor;
      } else {
        nestedNodes.push(nextCursor);
        targetId = nextCursor.$ref ?? null;
      }

      if (targetId !== null) {
        const targetNode = nodesStore.GetNodeWithId(targetId);
        nextCursor = targetNode;
        continue;
      }

      nextCursor = null;
    } while (nextCursor !== null);

    const finalNode = defu<INode, INode[]>({}, ...nestedNodes);

    delete finalNode.$ref;

    return finalNode;
  }

  CompileNode(cursor: string | INode, classesMap?: Map<string, any>) {
    const entityNode = this.ResolveCursor(cursor);
    return this.CompileClass(entityNode, classesMap);
  }

  CompileClass(node: INode, classesMap?: Map<string, any>) {
    if (!CheckType(NodeTypeObjectEntity, node)) {
      const output = valibot.safeParse(NodeTypeObjectEntity, node);
      console.debug(output.issues);
      console.debug(node);
      debugger;

      throw new Error("You must provide a NodeTypeObjectEntity to DtoCompiler#CompileClass");
    }

    return super.CompileClass(node, classesMap);
  }
}

export const dtoCompiler = new DtoCompiler();
