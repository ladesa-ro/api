import { namedTypes as n, visit } from 'ast-types';
import { parseModule } from 'magicast';
import { ChangeCaseHelper } from '../../../helpers';
import { getClassNode } from '../../../helpers/ts-ast/ts-ast';
import { BaseModuleCoreGenerator } from './BaseModuleCoreGenerator';

export class ModuleCoreGeneratorDatabaseContextCore extends BaseModuleCoreGenerator {
  addRepository(
    moduleName: string,
    accessorName: string = `${ChangeCaseHelper.c_camel(moduleName)}Repository`,
    createRepositoryName: string = `create${ChangeCaseHelper.c_pascal(moduleName)}Repository`,
  ) {
    //

    this.addModify(async (mod) => {
      const classNode = await getClassNode(mod.$ast, 'DatabaseContextCore');

      if (!classNode) {
        throw new Error('Não foi possível encontrar DatabaseContextCore');
      }

      const acessorAlreadyExists = await new Promise((resolve) => {
        visit(classNode, {
          visitClassMethod(path) {
            const node = path.node;

            if (node.key?.type === 'Identifier' && node.key.name === accessorName) {
              resolve(true);
            }

            return false;
          },
        });

        resolve(false);
      });

      if (!acessorAlreadyExists) {
        const dummyCode = `export class Dummy {
          get ${accessorName}() {
            return repositories.${createRepositoryName}(this.ds);
          }
        }`;

        const dummyMod = parseModule(dummyCode);

        const property: n.ClassMethod = (dummyMod.$ast as any).body[0].declaration.body.body[0];

        classNode.body.body.push(property);
      }
    });

    return this;
  }
}
