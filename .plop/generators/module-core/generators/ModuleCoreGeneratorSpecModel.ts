import { builders as b, namedTypes as n } from 'ast-types';
import { castArray } from 'lodash';
import { getInterfaceNode } from '../../../helpers/ts-ast/ts-ast';
import { BaseModuleCoreGenerator } from './BaseModuleCoreGenerator';

export type IPropriedadeDeclarada = {
  nome: string;
  descricao: string;
  tipoInterface: string;
};


export class ModuleCoreGeneratorSpecModel extends BaseModuleCoreGenerator {
  addPropertySignature(modelName: string, propriedadeDeclarada: IPropriedadeDeclarada) {
    this.addModify(async (mod) => {
      const $ast = mod.$ast;

      const interfaceNode = await getInterfaceNode($ast, modelName);

      if (!interfaceNode) {
        throw new TypeError(`Interface ${modelName} não encontrada: ${interfaceNode}.`);
      }

      const tsInterfaceBodyNode = interfaceNode.body;

      const isPropertyAlreadyDeclared = tsInterfaceBodyNode.body.some((tsPropertySignatureNode) => {
        try {
          if (n.TSPropertySignature.assert(tsPropertySignatureNode) && n.Identifier.assert(tsPropertySignatureNode.key)) {
            return tsPropertySignatureNode.key.name === propriedadeDeclarada.nome;
          }
        } catch (e) {}

        return false;
      });

      if (!isPropertyAlreadyDeclared) {
        const typeAnnotationNode = b.tsTypeAnnotation(b.tsTypeReference(b.identifier(propriedadeDeclarada.tipoInterface)));

        const objetTypePropertyNode = b.tsPropertySignature(b.identifier(propriedadeDeclarada.nome), typeAnnotationNode, false);

        tsInterfaceBodyNode.body.push(objetTypePropertyNode);
      }
    });

    return this;
  }

  addPropertiesSignatures(modelName: string, propriedadesDeclaradas: IPropriedadeDeclarada | IPropriedadeDeclarada[]) {
    for (const propriedadeDeclarada of castArray(propriedadesDeclaradas)) {
      this.addPropertySignature(modelName, propriedadeDeclarada);
    }

    return this;
  }
}
