import type KeycloakAdminClientPrimitive from '@keycloak/keycloak-admin-client';
import KcModule from '@keycloak/keycloak-admin-client';

const KeycloakAdminClient = (KcModule as any).default;
type KeycloakAdminClient = KeycloakAdminClientPrimitive;

export { KeycloakAdminClient };

// END @keycloak/keycloak-admin-client module
