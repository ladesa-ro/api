import { builders as b, namedTypes as n, visit } from 'ast-types';
import { NodePath } from 'ast-types/lib/node-path';
import { ProxifiedModule } from 'magicast';
import { normalize } from 'pathe';

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

const checkHasExportAllFromPathName = (ast: n.Node, pathName: string) => {
  return new Promise<boolean>((resolve) => {
    visit(ast, {
      visitExportAllDeclaration(path) {
        const node = path.node;

        if (typeof node.source.value === 'string' && normalize(node.source.value) === normalize(pathName)) {
          resolve(true);
        }

        return false;
      },
    });

    resolve(false);
  });
};

export const addExportAllFrom = async (mod: ProxifiedModule, pathName: string) => {
  const isAlreadyExported = await checkHasExportAllFromPathName(mod.$ast, pathName);

  if (!isAlreadyExported) {
    visit(mod.$ast, {
      visitProgram(path) {
        const node = path.node;

        const lastExport = node.body.findLastIndex((i) => i.type === 'ExportAllDeclaration') ?? -1;

        const targetIndex = lastExport !== -1 ? lastExport : 0;

        node.body.splice(targetIndex, 0, b.exportAllDeclaration(b.literal(pathName)));

        return false;
      },
    });
  }
};

export const getInterfaceNode = ($ast: n.Node, modelName: string) => {
  return new Promise<n.TSInterfaceDeclaration | null>((resolve) => {
    visit($ast, {
      visitTSInterfaceDeclaration(path) {
        const node = path.node;

        if (n.Identifier.assert(node.id) && node.id.name === modelName) {
          resolve(node);
        }

        return false;
      },
    });

    resolve(null);
  });
};

export const getClassNode = ($ast: n.Node, className: string) => {
  return new Promise<n.ClassDeclaration | null>((resolve) => {
    visit($ast, {
      visitClassDeclaration(path) {
        const node = path.node;

        if (n.Identifier.assert(node.id) && node.id.name === className) {
          resolve(node);
        }

        return false;
      },
    });

    resolve(null);
  });
};
