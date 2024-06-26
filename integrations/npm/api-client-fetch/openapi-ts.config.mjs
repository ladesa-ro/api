/** @type {import('@hey-api/openapi-ts').UserConfig} */

export default {
  //

  base: '#',

  //

  client: 'fetch',

  name: 'LadesaApiClient',
  services: {
    asClass: true,
  },

  //

  input: '../../openapi-json/openapi-spec.json',

  output: {
    format: 'prettier',
    path: './src/http/generated',
  },

  //
};
