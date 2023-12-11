const CracoAlias = require('craco-alias')
const CracoEnvPlugin = require('craco-plugin-env')

module.exports = {
  babel: {
    loaderOptions: {
      cacheDirectory: true,
      cacheCompression: false
    }
  },
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
    configure: {
      cache: {
        type: 'filesystem'
      }
    },
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc'
    }
  }
}
