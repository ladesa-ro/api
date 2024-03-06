import { IDatedObject, IEntityDate, IObjectUuid } from "../../(core)";
import { ICampusModel } from "../../ambientes";



export interface IModalidadeModel extends IObjectUuid, IDatedObject {
    //

    id: string;

    //

    nome: string;
    slug: string;

    //

    campus: ICampusModel;

    //

    dateCreated: IEntityDate;
    dateUpdated: IEntityDate;
    dateDeleted: null | IEntityDate;

    //
}
