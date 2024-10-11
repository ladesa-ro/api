/** @type {import('@hey-api/openapi-ts').UserConfig} */

export default {
  //

  base: "#",

  //

  client: "fetch",

  name: "LadesaApiClient",
  services: {
    asClass: true,
  },

  //

  input: "../../openapi-json/generated.json",

  output: {
    format: "biome",
    path: "./src/http/generated",
  },

  //
};
