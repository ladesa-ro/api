import { CheckTypeArray, CheckTypeObject, CheckView } from '@unispec/ast-builder';
import { IUniNodeView } from '@unispec/ast-types';
import { UniRepository } from '@unispec/ast-utils';
import { uniq } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import { getLadesaNodesRepository } from './providers';

// ==========================

export const QbEfficientLoadForView = (repository: UniRepository, realTargetNodeView: IUniNodeView, qb: SelectQueryBuilder<any>, alias: string, selection: boolean | string[] = true) => {
  const opaqueTargetNodeViewType = realTargetNodeView.type;

  const realTargetViewNodeType = opaqueTargetNodeViewType && repository.GetRealTarget(opaqueTargetNodeViewType);

  if (CheckTypeObject(realTargetViewNodeType)) {
    let counter = 0;

    let rootSelection: boolean | string[] = [];

    if (typeof selection === 'boolean') {
      rootSelection = selection;
    } else {
      rootSelection = uniq(['id', ...selection.map((i) => i.split('.')[0])]);
    }

    const metadata = qb.expressionMap.findAliasByName(alias).metadata;

    const propertiesMap = metadata.propertiesMap;

    for (const [propertyKey, opaquePropertyNode] of Object.entries(realTargetViewNodeType.properties)) {
      counter++;

      if (!Object.hasOwn(propertiesMap, propertyKey)) {
        console.warn(`-> entity ${metadata.name} dont have path ${propertyKey}.`);
        continue;
      }

      if (!rootSelection) {
        continue;
      }

      const includeProperty = Array.isArray(rootSelection) ? rootSelection.includes(propertyKey) : rootSelection;

      if (!includeProperty) {
        continue;
      }

      const subPath = `${alias}.${propertyKey}`;

      let realPropertyNode = repository.GetRealTargetStrict(opaquePropertyNode);

      if (CheckTypeArray(realPropertyNode)) {
        realPropertyNode = repository.GetRealTargetStrict(realPropertyNode.items);
      }

      if (CheckView(realPropertyNode)) {
        const childNodeViewName = realPropertyNode.name;
        const opaqueChildNodeType = realPropertyNode.type;

        if (CheckTypeObject(opaqueChildNodeType)) {
          const childSelection = rootSelection === true ? true : uniq(rootSelection.filter((i) => i.startsWith(`${propertyKey}.`)).map((i) => i.slice(i.indexOf('.') + 1)));

          const childAlias = `${alias}_${propertyKey[0]}${counter}`;

          qb.leftJoin(subPath, childAlias);
          QbEfficientLoad(childNodeViewName, qb, childAlias, childSelection);
        }
      } else {
        qb.addSelect(subPath);
      }
    }
  }
};

export const QbEfficientLoad = (opaqueTargetViewCursor: string, qb: SelectQueryBuilder<any>, alias: string, selection: boolean | string[] = true) => {
  const repository = getLadesaNodesRepository();

  const realTargetNodeView = repository.GetRealTargetStrict(opaqueTargetViewCursor);

  if (CheckView(realTargetNodeView)) {
    return QbEfficientLoadForView(repository, realTargetNodeView, qb, alias, selection);
  }
};
