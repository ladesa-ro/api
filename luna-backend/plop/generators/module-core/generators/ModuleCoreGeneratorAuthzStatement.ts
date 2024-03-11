import { builders as b, namedTypes as n } from 'ast-types';
import { parseModule } from 'magicast';
import { BaseModuleCoreGenerator } from './BaseModuleCoreGenerator';

export class ModuleCoreGeneratorAuthzStatement extends BaseModuleCoreGenerator {
  addTypeDeclarationStatement(typeName: string, actionName: string, type: 'check' | 'filter', dto: string | null = null) {
    this.addModify(async (mod) => {
      const baseType = type === 'check' ? `IBaseAuthzCheck` : `IBaseAuthzFilter`;
      const params = `${dto ? `, { dto: ${dto} }` : ''}`;

      if (mod.$ast.type === 'Program') {
        const statementAlreadyExists = mod.$ast.body.some((i) => {
          if (i.type === 'ExportNamedDeclaration' && i.exportKind === 'type') {
            if (i.declaration?.type === 'TSTypeAliasDeclaration') {
              return i.declaration.id.name === typeName;
            }
          }

          return false;
        });

        if (statementAlreadyExists) {
          return;
        }

        const indexOfStatementCheck = mod.$ast.body.findIndex((i) => {
          if (i.type === 'ExportNamedDeclaration' && i.exportKind === 'type') {
            if (i.declaration?.type === 'TSTypeAliasDeclaration') {
              return i.declaration.id.name === 'IAuthzStatementCheck';
            }
          }
          return false;
        });

        const statementDeclaration = `export type ${typeName} = ${baseType}<'${actionName}'${params}>;`;

        const statementDeclarationMod = parseModule(statementDeclaration);

        mod.$ast.body.splice(indexOfStatementCheck, 0, <any>((statementDeclarationMod.$ast as n.Program).body[0] as n.ExportNamedDeclaration));

        const nodeToAdd = (mod.$ast.body.find((i) => {
          if (i.type === 'ExportNamedDeclaration' && i.exportKind === 'type') {
            if (i.declaration?.type === 'TSTypeAliasDeclaration') {
              return (i.declaration.id.name === 'IAuthzStatementCheck' && type === 'check') || (i.declaration.id.name === 'IAuthzStatementFind' && type === 'filter');
            }
          }
          return false;
        }) ?? null) as n.ExportNamedDeclaration | null;

        if (nodeToAdd) {
          const typeDeclaration = nodeToAdd.declaration as n.TSTypeAliasDeclaration;
          const annotation = typeDeclaration.typeAnnotation;

          if (annotation.type === 'TSUnionType') {
            annotation.types.push(b.tsTypeReference(b.identifier(typeName)));
          }
        }
      }
    });

    return this;
  }
}
