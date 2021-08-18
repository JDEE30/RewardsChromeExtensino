const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtensionReLoader = require('webpack-extension-reloader');

module.exports = merge(common(true),
  {
    watch: true,
    devtool: 'inline-source-map',
    mode: 'development'
  },
  {
    plugins: [
      !process.env.NO_RELOAD && new ExtensionReLoader({
        reloadPage: true,
        entries: {
          background: 'background',
          contentScript: "content_script"
        }
      })
    ].filter(Boolean)
  }
);
