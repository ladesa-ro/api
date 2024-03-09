import { namedTypes as n, visit } from 'ast-types';
import { NodePath } from 'ast-types/lib/node-path';
import { ProxifiedModule } from 'magicast';

export const findNestJsModuleObjectConfigProperty = (ast: n.Node, propName: string) =>
  new Promise<n.ObjectProperty | null>((resolve) => {
    visit(ast, {
      visitClassDeclaration(path) {
        visit((path.node as any).decorators, {
          visitObjectProperty(path) {
            const node = path.node;

            if (n.Identifier.assert(node.key)) {
              if (node.key.name === propName) {
                const parentsToCheck = [
                  //
                  [null, (path: NodePath<n.ObjectProperty>) => path.parentPath],
                  [() => true, (path: NodePath<n.ObjectExpression[]>) => path.parentPath],
                  [(path: NodePath<n.ObjectExpression>) => n.ObjectExpression.assert(path.node), (path: NodePath<n.ObjectExpression>) => path.parentPath],
                  [(path: NodePath<n.CallExpression>) => n.CallExpression.assert(path.node), (path: NodePath<n.CallExpression>) => path.parentPath.parentPath],
                  [(path: NodePath<n.Decorator>) => n.Decorator.assert(path.node), (path: NodePath<n.Decorator>) => path],
                  [
                    (path: NodePath<n.Decorator>) => {
                      const decoratorNode = path.node;
                      const decoratorNodeExpression = decoratorNode.expression;

                      if (n.CallExpression.assert(decoratorNodeExpression)) {
                        const decoratorNodeExpressionCallee = decoratorNodeExpression.callee;

                        if (n.Identifier.assert(decoratorNodeExpressionCallee)) {
                          const decoratorIdentifier = decoratorNodeExpressionCallee.name;
                          return decoratorIdentifier === 'Module';
                        }
                      }

                      return false;
                    },
                  ],
                ] as const;

                let currentCheckNode: any = path;

                let index = -1;

                for (const parentToCheck of parentsToCheck) {
                  ++index;

                  // console.log(`Check: #${index}`);

                  const checkFn = parentToCheck[0];
                  const transformFn = parentToCheck[1];

                  if (checkFn !== null) {
                    try {
                      if (checkFn(currentCheckNode) === false) {
                        console.log('nop', currentCheckNode);
                        return false;
                      }
                    } catch (e) {
                      console.log('nop', currentCheckNode);
                      return false;
                    }
                  }

                  currentCheckNode = transformFn ? transformFn(currentCheckNode) : currentCheckNode;
                }

                resolve(node);
              }
            }
            return false;
          },
        });

        return false;
      },
    });

    resolve(null);
  });

export const addImportMember = (mod: ProxifiedModule, path: string, member: string) => {
  if (mod.imports.$items.some((i) => i.from === path && i.imported === member)) {
    return;
  }

  mod.imports.$add({ from: path, imported: member });
};
