import * as Spec from '@sisgea/spec';
import { uniq } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';

export enum AppResource {
  ARQUIVO = 'Arquivo',
  IMAGEM = 'Imagem',
  IMAGEM_ARQUIVO = 'ImagemArquivo',
  ESTADO = 'Estado',
  CIDADE = 'Cidade',
  MODALIDADE = 'Modalidade',
}

type ILoadStrategy = {
  resource: string | AppResource;
  declarationFactory: Spec.IDeclarator;
  allowedProperties: string[];
};

const loadStrategies: ILoadStrategy[] = [
  {
    resource: AppResource.ARQUIVO,
    declarationFactory: Spec.Arquivo,
    allowedProperties: ['id', 'nome', 'mimeType', 'sizeBytes', 'dateCreated', 'dateUpdated', 'dateDeleted'],
  },
  {
    resource: AppResource.IMAGEM,
    declarationFactory: Spec.Imagem,
    allowedProperties: ['id', 'descricao', 'imagemArquivo', 'dateCreated', 'dateUpdated', 'dateDeleted'],
  },
  {
    resource: AppResource.IMAGEM_ARQUIVO,
    declarationFactory: Spec.ImagemArquivo,
    allowedProperties: ['id', 'largura', 'altura', 'formato', 'mimeType', 'arquivo', 'dateCreated'],
  },
  {
    resource: AppResource.ESTADO,
    declarationFactory: Spec.EstadoDeclarationFactory,
    allowedProperties: ['id', 'nome', 'sigla'],
  },
  {
    resource: AppResource.CIDADE,
    declarationFactory: Spec.CidadeDeclarationFactory,
    allowedProperties: ['id', 'nome', 'estado'],
  },
  {
    resource: AppResource.MODALIDADE,
    declarationFactory: Spec.ModalidadeDeclarationFactory,
    allowedProperties: ['id', 'nome', 'slug', 'dateCreated', 'dateUpdated', 'dateDeleted'],
  },
];

const getLoadStrategy = (resource: AppResource | string) => {
  const loadStrategy = loadStrategies.find((loadStrategy) => loadStrategy.resource === resource);

  if (!loadStrategy) {
    return null;
  }

  return loadStrategy;
};

export const AppResourceView = (resource: AppResource | string, qb: SelectQueryBuilder<any>, alias: string, selection: true | string[] = true) => {
  const loadStrategy = getLoadStrategy(resource);

  if (loadStrategy) {
    const { declarationFactory } = loadStrategy;

    const declaration = declarationFactory();

    let counter = 0;

    const rootSelection = selection === true ? true : uniq(['id', ...selection.map((i) => i.split('.')[0])]);

    for (const propertyKey in declaration.properties) {
      const property = declaration.properties[propertyKey];
      counter++;

      if (!loadStrategy.allowedProperties.includes(propertyKey)) {
        continue;
      }

      if (rootSelection === true || rootSelection.includes(propertyKey)) {
        if (typeof property.type === 'function') {
          const childDeclaration = property.type();

          const childDeclarationOriginal = childDeclaration.partialOf?.() ?? childDeclaration;

          const childSelection = selection === true ? true : uniq(selection.filter((i) => i.startsWith(`${propertyKey}.`)).map((i) => i.slice(i.indexOf('.') + 1)));

          const childAlias = `${alias}_${propertyKey[0]}${counter}`;

          qb.leftJoin(`${alias}.${propertyKey}`, childAlias);

          AppResourceView(childDeclarationOriginal.name, qb, childAlias, childSelection);
        } else {
          qb.addSelect(`${alias}.${propertyKey}`);
        }
      }
    }
  }

  return qb;
};
