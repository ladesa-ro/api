export interface IConfigRuntime {
  getRuntimePort(): number;

  getRuntimeNodeEnv(): string;

  getRuntimeIsProduction(): boolean;

  getRuntimeIsDevelopment(): boolean;
}
