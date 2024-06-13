import LadesaTypings from '@ladesa-ro/especificacao';

export type IUsuarioDaRequisicao = null | Pick<LadesaTypings.Usuario, 'id' | 'nome' | 'matriculaSiape' | 'email' | 'isSuperUser'>;
