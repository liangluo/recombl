module.exports = function(baseConfig) {
  return {
    output: {
      filename: '[name].js',
    },

    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },

    resolve: {
      // root: [ process.env.MODULE_PATH ]
      extensions: ['', '.js', '.jsx'],
      alias: baseConfig.alias
    },

    resolveLoader: {
      // root: process.env.MODULE_PATH,
      modulesDirectories: ['web_loaders', 'web_modules', 'node_loaders', process.env.MODULE_PATH]
    }
  }
}