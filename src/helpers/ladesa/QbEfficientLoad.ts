import { CheckTypeArray, CheckTypeObject, CheckView } from '@unispec/ast-builder';
import { uniq } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import { getLadesaNodesRepository } from './providers';

export const QbEfficientLoad = (opaqueTargetViewCursor: string, qb: SelectQueryBuilder<any>, alias: string, selection: true | string[] = true) => {
  const repository = getLadesaNodesRepository();

  const realTargetNodeView = repository.GetRealTargetStrict(opaqueTargetViewCursor);

  if (CheckView(realTargetNodeView)) {
    const opaqueTargetNodeViewType = realTargetNodeView.type;

    const realTargetViewNodeType = opaqueTargetNodeViewType && repository.GetRealTarget(opaqueTargetNodeViewType);

    if (CheckTypeObject(realTargetViewNodeType)) {
      let counter = 0;

      const rootSelection = selection === true ? true : uniq(['id', ...selection.map((i) => i.split('.')[0])]);

      for (const [propertyKey, opaquePropertyNode] of Object.entries(realTargetViewNodeType.properties)) {
        counter++;

        if (rootSelection === true || rootSelection.includes(propertyKey)) {
          let realPropertyNode = repository.GetRealTargetStrict(opaquePropertyNode);

          if (CheckTypeArray(realPropertyNode)) {
            realPropertyNode = repository.GetRealTargetStrict(realPropertyNode.items);
          }

          if (CheckView(realPropertyNode)) {
            const childNodeViewName = realPropertyNode.name;
            const opaqueChildNodeType = realPropertyNode.type;

            if (CheckTypeObject(opaqueChildNodeType)) {
              const childSelection = selection === true ? true : uniq(selection.filter((i) => i.startsWith(`${propertyKey}.`)).map((i) => i.slice(i.indexOf('.') + 1)));

              const childAlias = `${alias}_${propertyKey[0]}${counter}`;

              qb.leftJoin(`${alias}.${propertyKey}`, childAlias);
              QbEfficientLoad(childNodeViewName, qb, childAlias, childSelection);
            }
          } else {
            qb.addSelect(`${alias}.${propertyKey}`);
          }
        }
      }
    }
  }
};
