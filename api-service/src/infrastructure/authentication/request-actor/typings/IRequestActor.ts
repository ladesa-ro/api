import LadesaTypings from "@ladesa-ro/especificacao";

export type IRequestActor = null | Pick<LadesaTypings.Usuario, "id" | "nome" | "matriculaSiape" | "email" | "isSuperUser">;
