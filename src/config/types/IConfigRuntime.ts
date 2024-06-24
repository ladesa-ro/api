export interface IConfigRuntime {
  getRuntimePort(): number;

  getRuntimeNodeEnv(): string;

  getRuntimeIsProduction(): boolean;

  getRuntimeIsDevelopment(): boolean;

  getRuntimePrefix(): null | string;

  getSwaggerServers(): null | string[];

  //

  getStoragePath(): string;
}
