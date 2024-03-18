import { CALENDARIO_LETIVO_FIND_ONE_BY_ID } from "./calendario-letivo-find-one.operation";
import { CALENDARIO_LETIVO_FIND_ALL } from "./calendario-letivo-find-all.operation";

import { CALENDARIO_LETIVO_DELETE_ONE_BY_ID } from "./calendario-letivo-delete-one.operation";
import { CALENDARIO_LETIVO_CREATE } from "./calendario-letivo-create.operation";
import { CALENDARIO_LETIVO_UPDATE } from "./calendario-letivo-update.operation";


export const CalendarioLetivoOperations = {
    CALENDARIO_LETIVO_CREATE: CALENDARIO_LETIVO_CREATE,
    CALENDARIO_LETIVO_UPDATE: CALENDARIO_LETIVO_UPDATE,
    CALENDARIO_LETIVO_FIND_ALL: CALENDARIO_LETIVO_FIND_ALL,
    CALENDARIO_LETIVO_DELETE: CALENDARIO_LETIVO_DELETE_ONE_BY_ID,
    CALENDARIO_LETIVO_FIND_ONE_BY_ID: CALENDARIO_LETIVO_FIND_ONE_BY_ID,
}