import { builders as b, namedTypes as n, visit } from "ast-types";
import { parseModule } from "magicast";
import { getClassNode } from "../../../helpers/ts-ast/ts-ast";
import { BaseModuleCoreGenerator } from "./BaseModuleCoreGenerator";

export class ModuleCoreGeneratorBaseAuthzPolicy extends BaseModuleCoreGenerator {
  addTypeDeclarationStatement(action: string, statementTypeAliasName: string) {
    const dummyCode = `export abstract class Dummy {
      abstract ${action}: Authz.${statementTypeAliasName};
    }`;

    const dummyMod = parseModule(dummyCode);
    const property: n.ClassMethod = (dummyMod.$ast as any).body[0].declaration.body.body[0];

    this.addModifyAcessor("BaseAuthzPolicy", action, property);

    this.addModify(async (mod) => {
      const classNode = await getClassNode(mod.$ast, "BaseAuthzPolicy");

      if (!classNode) {
        throw new Error(`Não foi possível encontrar BaseAuthzPolicy.`);
      }

      visit(classNode.body, {
        visitClassMethod(path) {
          const node = path.node;

          if (node.key.type === "Identifier" && node.key.name === "statements") {
            const arrayExpression = (node.body.body[0] as n.ReturnStatement).argument as n.ArrayExpression;

            const alreadyInStatements = arrayExpression.elements.some((i) => {
              if (i?.type === "MemberExpression" && i.property.type === "Identifier" && i.property.name === action) {
                return true;
              }
              return false;
            });

            if (!alreadyInStatements) {
              arrayExpression.elements.push(b.memberExpression(b.thisExpression(), b.identifier(action)));
            }
          }

          return false;
        },
      });
    });

    return this;
  }
}
