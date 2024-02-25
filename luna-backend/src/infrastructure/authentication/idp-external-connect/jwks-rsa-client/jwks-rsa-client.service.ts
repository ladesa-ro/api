import { Injectable } from '@nestjs/common';
import { JwksClient, SigningKey } from 'jwks-rsa';

@Injectable()
export class JwksRsaClientService {
  #jwksClient: JwksClient | null = null;

  private async createJwksClient(jwksUri: string | null = null) {
    if (!jwksUri) {
      console.warn('process.env.HOST_API_AUTH_JWKS não foi fornecido.');
    } else {
      return new JwksClient({
        timeout: 30000, // Defaults to 30s

        cache: true, // Default Value
        cacheMaxEntries: 5, // Default value
        cacheMaxAge: 600000, // Defaults to 10m

        rateLimit: true,
        jwksRequestsPerMinute: 10, // Default value

        jwksUri: jwksUri,
      });
    }

    return null;
  }

  private async setup(jwksUri: string | null = null) {
    if (!this.#jwksClient) {
      this.#jwksClient = await this.createJwksClient(jwksUri);
    }
  }

  async getJwksClient(jwksUri: string | null = null) {
    await this.setup(jwksUri);

    if (!this.#jwksClient) {
      throw new Error('[JwksRsaClientService::error] can not create JwksClient.');
    }

    return this.#jwksClient;
  }

  async getSigninKeyByKid(kid: string | null): Promise<SigningKey | null> {
    try {
      if (kid) {
        const jwksClient = await this.getJwksClient();
        const signingKey = await jwksClient.getSigningKey(kid);
        return signingKey;
      }
    } catch (_) {
      console.debug(_);
    }

    return null;
  }

  async getSigninKeyPublicKeyByKid(kid: string | null): Promise<string | null> {
    const signingKey = await this.getSigninKeyByKid(kid);

    if (signingKey) {
      return signingKey.getPublicKey();
    }

    return null;
  }
}
