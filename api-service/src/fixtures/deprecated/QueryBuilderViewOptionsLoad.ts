type LoadMeta<RelationOptions> = {
  alias: string;
  options?: RelationOptions;
};

export type IQueryBuilderViewOptionsLoad<RelationOptions> = boolean | LoadMeta<RelationOptions>;

export const getQueryBuilderViewLoadMeta = <RelationOptions>(
  optionsLoad: IQueryBuilderViewOptionsLoad<RelationOptions> | undefined,
  autoLoad: boolean,
  defaultAlias: string,
  defaultOptions?: RelationOptions,
): false | LoadMeta<RelationOptions> => {
  if (optionsLoad !== false) {
    if (optionsLoad === true || optionsLoad === undefined) {
      if (autoLoad) {
        return {
          alias: defaultAlias,
          options: defaultOptions,
        };
      }
    } else {
      return optionsLoad;
    }
  }

  return false;
};
