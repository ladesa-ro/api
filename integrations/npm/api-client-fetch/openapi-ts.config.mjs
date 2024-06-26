/** @type {import('@hey-api/openapi-ts').UserConfig} */

export default {
  base: '#',
  client: 'fetch',
  format: 'prettier',
  name: 'LadesaApiClient',
  input: '../../openapi-json/openapi-spec.json',
  output: './src/http/generated',
};
