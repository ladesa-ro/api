import inclusion from 'inclusion';

// START helmet module
import type Helmet from 'helmet';

type IHelmet = typeof Helmet;

export const getModuleHelmet = (): Promise<IHelmet> => inclusion('helmet').then((mod) => mod.default);

// END helmet module
