import { AppConfigService } from "@/infrastructure/config";
import { Inject, Injectable } from "@nestjs/common";
import { BaseClient, Issuer } from "openid-client";

@Injectable()
export class OpenidConnectService {
  trustIssuerClient: BaseClient | null = null;
  #initialized = false;

  constructor(
    //
    @Inject(AppConfigService)
    readonly appConfigService: AppConfigService,
  ) {}

  private get oidcClientCredentials() {
    return this.appConfigService.getOidcClientCredentials();
  }

  async setup() {
    if (!this.#initialized) {
      try {
        const oidcClientCredentials = this.oidcClientCredentials;

        const TrustIssuer = await Issuer.discover(oidcClientCredentials.issuer);

        const trustIssuerClient = new TrustIssuer.Client({
          client_id: oidcClientCredentials.clientId,
          client_secret: oidcClientCredentials.clientSecret,
        });

        this.trustIssuerClient = trustIssuerClient;

        this.#initialized = true;
      } catch (error) {
        console.log(error);
      }
    }

    return this.#initialized;
  }

  async getTrustIssuerClient() {
    while (!this.#initialized) {
      await this.setup();
    }

    const trustIssuerClient = this.trustIssuerClient;

    if (trustIssuerClient) {
      return trustIssuerClient;
    }

    throw new Error("[OpenidConnectService::error] trustIssuerClient is null");
  }
}
