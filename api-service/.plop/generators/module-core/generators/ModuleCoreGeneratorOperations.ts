import { builders as b, visit } from "ast-types";
import { BaseModuleCoreGenerator } from "./BaseModuleCoreGenerator";

export class ModuleCoreGeneratorOperations extends BaseModuleCoreGenerator {
  addOperation(token: string, importPath: string) {
    this.addImportMember(importPath, token);

    this.addModify((mod) => {
      //
      visit(mod.$ast, {
        visitObjectExpression(path) {
          const node = path.node;

          const isPropertyAlreadyDeclared = node.properties.some((propertyNode) => {
            if (propertyNode.type === "ObjectProperty" && propertyNode.key.type === "Identifier" && propertyNode.key.name === token) {
              return true;
            }
            return false;
          });

          if (!isPropertyAlreadyDeclared) {
            node.properties.push(b.objectProperty(b.identifier(token), b.identifier(token)));
          }

          return false;
        },
      });
    });

    return this;
  }
}
