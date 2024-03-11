export type IEntityDate = Date | string | number;

export interface IDatedObject {
  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;
}
