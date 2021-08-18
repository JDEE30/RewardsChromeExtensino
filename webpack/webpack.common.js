const { join, resolve } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");

module.exports = (devMode) => ({
  entry: {
    content_script: getSrcPath("content_script.ts"),
    background: getSrcPath("background.ts"),
    "views/options/options": getSrcPath("views/options/options.ts"),
    "views/popup/popup": getSrcPath("views/popup/popup.ts")
  },
  output: {
    path: getDistPath(""),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.html$/i,
        loader: 'html-loader?esModule',
      },
      {
        include: /\.css$|\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader", // Creates style nodes from JS strings,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: devMode ? '[local]-[name]-[hash:base64:5]' : '[local]__[hash:base64:5]',
              },
            }
          },
          "sass-loader", // Compiles Sass to CSS,
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@services": resolve(__dirname, "../src/services/")
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: getSrcPath("assets"),
        to: getDistPath("assets")
      },
      {
        from: getSrcPath("manifest.json"),
        to: getDistPath("manifest.json")
      },
      {
        from: getSrcPath("views"),
        to: getDistPath("views"),
        ignore: ["*.ts", "*.scss"]
      }
    ]),
    new WebpackNotifierPlugin({
      title: "Build Successful",
      contentImage: getSrcPath("assets/logo.png")
    })
  ],
  stats: {
    children: false,
    entrypoints: false,
    warnings: true,
    modules: false,
    assetsSort: '!size'
  }
});

function getSrcPath(path) {
  return join(__dirname, "../src/" + path);
}

function getDistPath(path) {
  return join(__dirname, "../dist/" + path);
}
