import { Nodes } from '@ladesa-ro/especificacao';
import { UniRepository } from '@unispec/ast-utils';

let cachedLadesaNodesRepository: UniRepository | null = null;

const fetchLadesaNodesRepository = () => {
  const repository = new UniRepository();
  repository.Add(Nodes);

  return repository;
};

export const getLadesaNodesRepository = () => {
  if (!cachedLadesaNodesRepository) {
    cachedLadesaNodesRepository = fetchLadesaNodesRepository();
  }

  return cachedLadesaNodesRepository;
};
