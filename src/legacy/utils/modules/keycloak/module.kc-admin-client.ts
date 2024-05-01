import inclusion from 'inclusion';

// START @keycloak/keycloak-admin-client module
import type KcAdminClient from '@keycloak/keycloak-admin-client';

type IKcAdminClient = typeof KcAdminClient;

export const getModuleKeycloakAdminClient = (): Promise<IKcAdminClient> => inclusion('@keycloak/keycloak-admin-client').then((mod: any) => mod.default);

// END @keycloak/keycloak-admin-client module
