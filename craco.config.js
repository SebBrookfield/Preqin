const CracoAlias = require('craco-alias')
const CracoEnvPlugin = require('craco-plugin-env')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: './tsconfig.paths.json'
      }
    },
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {}
      }
    }
  ],
  webpack: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc'
    }
  }
}
